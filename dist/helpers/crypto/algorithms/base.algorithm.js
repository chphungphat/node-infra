"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCryptoAlgorithm = exports.AbstractCryptoAlgorithm = void 0;
const base_helper_1 = require("../../../base/base.helper");
const utilities_1 = require("../../../utilities");
const common_1 = require("../common");
class AbstractCryptoAlgorithm extends base_helper_1.BaseHelper {
}
exports.AbstractCryptoAlgorithm = AbstractCryptoAlgorithm;
class BaseCryptoAlgorithm extends AbstractCryptoAlgorithm {
    constructor(opts) {
        var _a, _b;
        super({ scope: (_b = (_a = opts.scope) !== null && _a !== void 0 ? _a : opts.algorithm) !== null && _b !== void 0 ? _b : BaseCryptoAlgorithm.name, identifier: opts.algorithm });
        this.validateAlgorithmName({ algorithm: opts.algorithm });
        this.algorithm = opts.algorithm;
    }
    validateAlgorithmName(opts) {
        const { algorithm } = opts;
        if (!algorithm) {
            throw (0, utilities_1.getError)({
                message: `[validateAlgorithmName] Invalid algorithm name | algorithm: ${algorithm}`,
            });
        }
    }
    normalizeSecretKey(opts) {
        const { secret, length, padEnd = common_1.DEFAULT_PAD_END } = opts;
        if (secret.length > length) {
            return secret.slice(0, length);
        }
        return secret.padEnd(length, padEnd);
    }
    getAlgorithmKeySize() {
        var _a, _b, _c;
        const b = (0, utilities_1.int)((_c = (_b = (_a = this.algorithm) === null || _a === void 0 ? void 0 : _a.split('-')) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : common_1.DEFAULT_CIPHER_BITS);
        return (0, utilities_1.int)(b / 8);
    }
}
exports.BaseCryptoAlgorithm = BaseCryptoAlgorithm;
//# sourceMappingURL=base.algorithm.js.map