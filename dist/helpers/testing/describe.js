"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MochaTestDescribe = exports.TestDescribe = void 0;
const utilities_1 = require("../../utilities");
const logger_1 = require("../logger");
class TestDescribe {
    constructor(opts) {
        this.testPlan = opts.testPlan;
        this.logger = logger_1.LoggerFactory.getLogger([TestDescribe.name]);
    }
    static withTestPlan(opts) {
        const testDescribe = new TestDescribe(opts);
        return testDescribe;
    }
    run() {
        if (!this.testPlan) {
            throw (0, utilities_1.getError)({ message: `[run] Invalid test plan!` });
        }
        const fn = () => {
            before(() => __awaiter(this, void 0, void 0, function* () {
                const hook = this.testPlan.getHook({ key: 'before' });
                yield (hook === null || hook === void 0 ? void 0 : hook(this.testPlan));
            }));
            beforeEach(() => __awaiter(this, void 0, void 0, function* () {
                const hook = this.testPlan.getHook({ key: 'beforeEach' });
                yield (hook === null || hook === void 0 ? void 0 : hook(this.testPlan));
            }));
            after(() => __awaiter(this, void 0, void 0, function* () {
                const hook = this.testPlan.getHook({ key: 'after' });
                yield (hook === null || hook === void 0 ? void 0 : hook(this.testPlan));
            }));
            afterEach(() => __awaiter(this, void 0, void 0, function* () {
                const hook = this.testPlan.getHook({ key: 'afterEach' });
                yield (hook === null || hook === void 0 ? void 0 : hook(this.testPlan));
            }));
            this.logger.info('[run][%s] START executing test plan!', this.testPlan.scope);
            this.testPlan.execute();
        };
        describe(this.testPlan.scope, fn);
    }
}
exports.TestDescribe = TestDescribe;
class MochaTestDescribe extends TestDescribe {
}
exports.MochaTestDescribe = MochaTestDescribe;
//# sourceMappingURL=describe.js.map