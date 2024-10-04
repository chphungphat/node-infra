"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRSA001Handler = void 0;
const helpers_1 = require("../../../helpers");
const utilities_1 = require("../../../utilities");
class TestRSA001Handler extends helpers_1.TestCaseHandler {
    execute() {
        if (!this.args) {
            throw (0, utilities_1.getError)({
                message: '[Test001Handler][execute] Invalid input args!',
            });
        }
        const { message } = this.args;
        const rsa = helpers_1.RSA.withAlgorithm();
        const keys = rsa.generateDERKeyPair();
        const encrypted = rsa.encrypt(message, keys.publicKey.toString('base64'));
        console.log('[execute] encrypted message: %s', encrypted);
        const decrypted = rsa.decrypt(encrypted, keys.privateKey.toString('base64'));
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
exports.TestRSA001Handler = TestRSA001Handler;
//# sourceMappingURL=rsa.js.map