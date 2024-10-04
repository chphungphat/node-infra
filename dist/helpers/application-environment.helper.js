"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationEnvironment = exports.ApplicationEnvironment = void 0;
class ApplicationEnvironment {
    constructor(opts) {
        this.arguments = {};
        this.prefix = opts.prefix;
        for (const key in opts.envs) {
            if (!key.startsWith(this.prefix)) {
                continue;
            }
            this.arguments[key] = opts.envs[key];
        }
    }
    get(key) {
        return this.arguments[key];
    }
    set(key, value) {
        this.arguments[key] = value;
    }
    keys() {
        return Object.keys(this.arguments);
    }
}
exports.ApplicationEnvironment = ApplicationEnvironment;
exports.applicationEnvironment = new ApplicationEnvironment({
    prefix: (_a = process.env.APPLICATION_ENV_PREFIX) !== null && _a !== void 0 ? _a : 'APP_ENV',
    envs: process.env,
});
//# sourceMappingURL=application-environment.helper.js.map