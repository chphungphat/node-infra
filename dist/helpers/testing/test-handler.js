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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseHandler = exports.BaseTestCaseHandler = void 0;
const utilities_1 = require("../../utilities");
const assert_1 = __importDefault(require("assert"));
const common_1 = require("./common");
const logger_1 = require("../logger");
class BaseTestCaseHandler {
    constructor(opts) {
        var _a, _b, _c, _d;
        this.logger = logger_1.LoggerFactory.getLogger([(_a = opts === null || opts === void 0 ? void 0 : opts.scope) !== null && _a !== void 0 ? _a : BaseTestCaseHandler.name]);
        this.context = opts.context;
        this.args = (_d = (_b = opts.args) !== null && _b !== void 0 ? _b : (_c = opts.argResolver) === null || _c === void 0 ? void 0 : _c.call(opts)) !== null && _d !== void 0 ? _d : null;
        this.validator = opts === null || opts === void 0 ? void 0 : opts.validator;
    }
    getArguments() {
        return this.args;
    }
}
exports.BaseTestCaseHandler = BaseTestCaseHandler;
class TestCaseHandler extends BaseTestCaseHandler {
    constructor(opts) {
        var _a;
        super(Object.assign(Object.assign({}, opts), { scope: (_a = opts.scope) !== null && _a !== void 0 ? _a : TestCaseHandler.name }));
    }
    _execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let validateRs = common_1.TestCaseDecisions.UNKNOWN;
            try {
                const executeRs = yield this.execute();
                validateRs = yield this.validate(executeRs);
            }
            catch (error) {
                this.logger.error('[_execute] Failed to execute test handler | Error: %s', error);
            }
            assert_1.default.equal(validateRs, common_1.TestCaseDecisions.SUCCESS);
        });
    }
    validate(opts) {
        var _a, _b;
        const validator = (_a = this.validator) !== null && _a !== void 0 ? _a : this.getValidator();
        if (!validator) {
            throw (0, utilities_1.getError)({
                message: '[validate] Invalid test case validator!',
            });
        }
        return (_b = validator(opts)) !== null && _b !== void 0 ? _b : common_1.TestCaseDecisions.UNKNOWN;
    }
}
exports.TestCaseHandler = TestCaseHandler;
//# sourceMappingURL=test-handler.js.map