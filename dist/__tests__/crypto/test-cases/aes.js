"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAES001Handler = void 0;
const helpers_1 = require("../../../helpers");
const utilities_1 = require("../../../utilities");
class TestAES001Handler extends helpers_1.TestCaseHandler {
    execute() {
        if (!this.args) {
            throw (0, utilities_1.getError)({
                message: '[Test001Handler][execute] Invalid input args!',
            });
        }
        const { secretKey, message } = this.args;
        const aes = helpers_1.AES.withAlgorithm('aes-256-cbc');
        const encrypted = aes.encrypt(message, secretKey);
        console.log('[execute] encrypted message: %s', encrypted);
        const decrypted = aes.decrypt(encrypted, secretKey);
        console.log('[execute] decrypted message: %s', decrypted);
        return { encrypted, decrypted, message };
    }
    getValidator() {
        return opts => {
            console.log('[getValidator] RUN HERE');
            const { message, encrypted, decrypted } = opts;
            if (!encrypted) {
                return helpers_1.TestCaseDecisions.FAIL;
            }
            if (message !== decrypted) {
                return helpers_1.TestCaseDecisions.FAIL;
            }
            return helpers_1.TestCaseDecisions.SUCCESS;
        };
    }
}
exports.TestAES001Handler = TestAES001Handler;
//# sourceMappingURL=aes.js.map