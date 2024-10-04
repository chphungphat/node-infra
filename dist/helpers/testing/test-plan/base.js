"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTestPlan = void 0;
const logger_1 = require("./../../logger");
const storage_1 = require("./../../storage");
class BaseTestPlan {
    constructor(opts) {
        var _a, _b, _c;
        const { scope } = opts;
        this.logger = logger_1.LoggerFactory.getLogger([scope]);
        this.registry = storage_1.DIContainerHelper.newInstance();
        this.scope = scope;
        this.hooks = (_a = opts.hooks) !== null && _a !== void 0 ? _a : {};
        this.testCases = [];
        if ((_b = opts.testCases) === null || _b === void 0 ? void 0 : _b.length) {
            this.testCases = this.testCases.concat(opts.testCases);
        }
        if (opts.testCaseResolver) {
            const extraTestCases = (_c = opts.testCaseResolver({ context: this })) !== null && _c !== void 0 ? _c : [];
            this.testCases = this.testCases.concat(extraTestCases);
        }
    }
    withTestCases(opts) {
        this.testCases = opts.testCases;
        return this;
    }
    getTestCases() {
        return this.testCases;
    }
    getHooks() {
        return this.hooks;
    }
    getHook(opts) {
        var _a, _b;
        return (_b = (_a = this.hooks) === null || _a === void 0 ? void 0 : _a[opts.key]) !== null && _b !== void 0 ? _b : null;
    }
    getRegistry() {
        return this.registry;
    }
    getContext() {
        return this;
    }
    bind(opts) {
        const registry = this.getRegistry();
        registry.set(opts.key, opts.value);
    }
    getSync(opts) {
        const registry = this.getRegistry();
        return registry.get(opts.key);
    }
    execute() {
        this.logger.info('[run] START RUNNING TEST CASE | Total test cases: %s', this.testCases.length);
        if (!this.testCases.length) {
            this.logger.info('[run] Not found test case(s)');
            return;
        }
        for (const testCase of this.testCases) {
            try {
                it(`RUN Test Case | Code: ${testCase.code} | Description: ${testCase.name ? `${testCase.name} - ` : ''}${testCase.description} | Expect: ${testCase.expectation}`, () => {
                    return testCase.run();
                });
            }
            catch (error) {
                this.logger.error('[%s] Failed to finish test case | error: %s', testCase.name, error);
            }
        }
    }
}
exports.BaseTestPlan = BaseTestPlan;
//# sourceMappingURL=base.js.map