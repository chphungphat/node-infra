"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AES = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const base_algorithm_1 = require("./base.algorithm");
const DEFAULT_LENGTH = 16;
class AES extends base_algorithm_1.BaseCryptoAlgorithm {
    constructor(opts) {
        super(Object.assign({ scope: AES.name }, opts));
    }
    static withAlgorithm(algorithm) {
        return new AES({ algorithm });
    }
    encrypt(message, secret, opts) {
        const { iv = crypto_1.default.randomBytes(DEFAULT_LENGTH), inputEncoding = 'utf-8', outputEncoding = 'base64', doThrow = true, } = opts !== null && opts !== void 0 ? opts : {};
        try {
            const secretKey = this.normalizeSecretKey({
                secret,
                length: this.getAlgorithmKeySize(),
            });
            const cipher = crypto_1.default.createCipheriv(this.algorithm, Buffer.from(secretKey), iv);
            const parts = [iv];
            const cipherText = cipher.update(message, inputEncoding);
            const cipherFinal = cipher.final();
            switch (this.algorithm) {
                case 'aes-256-cbc': {
                    break;
                }
                case 'aes-256-gcm': {
                    parts.push(cipher.getAuthTag());
                    break;
                }
            }
            parts.push(cipherText);
            parts.push(cipherFinal);
            return Buffer.concat(parts).toString(outputEncoding);
        }
        catch (error) {
            if (doThrow) {
                throw error;
            }
            return message;
        }
    }
    encryptFile(absolutePath, secret) {
        if (!absolutePath || (0, isEmpty_1.default)(absolutePath)) {
            return '';
        }
        const buffer = fs_1.default.readFileSync(absolutePath);
        const fileContent = buffer === null || buffer === void 0 ? void 0 : buffer.toString('utf-8');
        const encrypted = this.encrypt(fileContent, secret);
        return encrypted;
    }
    decrypt(message, secret, opts) {
        var _a, _b;
        const { inputEncoding = 'base64', outputEncoding = 'utf-8', doThrow = true } = opts !== null && opts !== void 0 ? opts : {};
        try {
            const iv = (_b = (_a = opts === null || opts === void 0 ? void 0 : opts.iv) !== null && _a !== void 0 ? _a : Buffer.from(message, inputEncoding).subarray(0, DEFAULT_LENGTH)) !== null && _b !== void 0 ? _b : Buffer.alloc(DEFAULT_LENGTH, 0);
            let messageIndex = iv.length;
            const secretKey = this.normalizeSecretKey({
                secret,
                length: this.getAlgorithmKeySize(),
            });
            const decipher = crypto_1.default.createDecipheriv(this.algorithm, Buffer.from(secretKey), iv);
            switch (this.algorithm) {
                case 'aes-256-cbc': {
                    break;
                }
                case 'aes-256-gcm': {
                    const authTag = Buffer.from(message, inputEncoding).subarray(iv.length, iv.length + DEFAULT_LENGTH);
                    messageIndex += authTag.length;
                    decipher.setAuthTag(authTag);
                    break;
                }
            }
            const cipherText = Buffer.from(message, inputEncoding).subarray(messageIndex);
            return Buffer.concat([decipher.update(cipherText), decipher.final()]).toString(outputEncoding);
        }
        catch (error) {
            if (doThrow) {
                throw error;
            }
            return message;
        }
    }
    decryptFile(absolutePath, secret) {
        if (!absolutePath || (0, isEmpty_1.default)(absolutePath)) {
            return '';
        }
        const buffer = fs_1.default.readFileSync(absolutePath);
        const fileContent = buffer === null || buffer === void 0 ? void 0 : buffer.toString('utf-8');
        const decrypted = this.decrypt(fileContent, secret);
        return decrypted;
    }
}
exports.AES = AES;
//# sourceMappingURL=aes.algorithm.js.map