"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const TestCases = __importStar(require("./test-cases"));
const utilities_1 = require("../../utilities");
helpers_1.TestDescribe.withTestPlan({
    testPlan: helpers_1.TestPlan.newInstance({
        scope: '000_CRYPTO',
        hooks: {},
        testCaseResolver: ({ context }) => {
            return [
                helpers_1.TestCase.withOptions({
                    code: (0, utilities_1.getUID)(),
                    description: 'Check AES message successfully encrypt and decrypt',
                    expectation: '',
                    handler: new TestCases.TestAES001Handler({
                        context,
                        args: { secretKey: 'abc123qwe', message: 'hello world' },
                    }),
                }),
                helpers_1.TestCase.withOptions({
                    code: (0, utilities_1.getUID)(),
                    description: 'Check RSA message successfully encrypt and decrypt',
                    expectation: '',
                    handler: new TestCases.TestRSA001Handler({
                        context,
                        args: {
                            message: 'hello world | minimal technology',
                        },
                    }),
                }),
            ];
        },
    }),
}).run();
//# sourceMappingURL=index.js.map