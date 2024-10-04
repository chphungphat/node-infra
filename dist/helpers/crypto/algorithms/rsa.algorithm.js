"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSA = void 0;
const crypto_1 = __importDefault(require("crypto"));
const base_algorithm_1 = require("./base.algorithm");
class RSA extends base_algorithm_1.BaseCryptoAlgorithm {
    constructor(opts) {
        super(Object.assign({ scope: RSA.name }, opts));
    }
    static withAlgorithm() {
        return new RSA({ algorithm: 'rsa' });
    }
    generateDERKeyPair(opts) {
        var _a;
        const keys = crypto_1.default.generateKeyPairSync('rsa', {
            modulusLength: (_a = opts === null || opts === void 0 ? void 0 : opts.modulus) !== null && _a !== void 0 ? _a : 1199,
        });
        return {
            publicKey: keys.publicKey.export({ type: 'spki', format: 'der' }),
            privateKey: keys.privateKey.export({ type: 'pkcs8', format: 'der' }),
        };
    }
    encrypt(message, pubKey, opts) {
        const { inputEncoding = { key: 'base64', message: 'utf-8' }, outputEncoding = 'base64', doThrow = true, } = opts !== null && opts !== void 0 ? opts : {};
        try {
            const k = crypto_1.default.createPublicKey({
                key: Buffer.from(pubKey, inputEncoding.key),
                format: 'der',
                type: 'spki',
            });
            const rs = crypto_1.default.publicEncrypt(k, Buffer.from(message, inputEncoding.message));
            return rs.toString(outputEncoding);
        }
        catch (error) {
            if (doThrow) {
                throw error;
            }
            return message;
        }
    }
    decrypt(message, privKey, opts) {
        const { inputEncoding = { key: 'base64', message: 'base64' }, outputEncoding = 'utf-8', doThrow = true, } = opts !== null && opts !== void 0 ? opts : {};
        try {
            const k = crypto_1.default.createPrivateKey({
                key: Buffer.from(privKey, inputEncoding.key),
                format: 'der',
                type: 'pkcs8',
            });
            const rs = crypto_1.default.privateDecrypt(k, Buffer.from(message, inputEncoding.message));
            return rs.toString(outputEncoding);
        }
        catch (error) {
            if (doThrow) {
                throw error;
            }
            return message;
        }
    }
}
exports.RSA = RSA;
//# sourceMappingURL=rsa.algorithm.js.map