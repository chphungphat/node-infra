"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hash = (text, options) => {
    const { algorithm, secret, outputType } = options;
    switch (algorithm) {
        case 'SHA256': {
            if (!secret) {
                return text;
            }
            return crypto_1.default.createHmac(algorithm, secret).update(text).digest(outputType);
        }
        case 'MD5': {
            return crypto_1.default.createHash(algorithm).update(text).digest(outputType);
        }
        default: {
            return text;
        }
    }
};
exports.hash = hash;
//# sourceMappingURL=crypto.utility.js.map