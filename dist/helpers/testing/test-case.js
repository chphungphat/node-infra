"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCase = void 0;
const utilities_1 = require("../../utilities");
const get_1 = __importDefault(require("lodash/get"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
class TestCase {
    constructor(opts) {
        const validateFields = ['code', 'description', 'expectation'];
        for (const key of validateFields) {
            const value = (0, get_1.default)(opts, key, null);
            if (value && !(0, isEmpty_1.default)(value)) {
                continue;
            }
            throw (0, utilities_1.getError)({
                message: `[TestCase] Invalid value for key: ${key} | value: ${value} | Opts: ${JSON.stringify(opts)}`,
            });
        }
        this.code = opts.code;
        this.name = opts.name;
        this.description = opts.description;
        this.expectation = opts.expectation;
        if (!this.description || (0, isEmpty_1.default)(this.description)) {
            throw (0, utilities_1.getError)({ message: `[TestCase][${this.code}] ` });
        }
        if (!this.description || (0, isEmpty_1.default)(this.description)) {
            throw (0, utilities_1.getError)({ message: `[TestCase][${this.code}] ` });
        }
        this.handler = opts.handler;
    }
    static withOptions(opts) {
        return new TestCase(opts);
    }
    run() {
        return Promise.resolve(this.handler._execute());
    }
}
exports.TestCase = TestCase;
//# sourceMappingURL=test-case.js.map