"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTCrashReportService = void 0;
const helpers_1 = require("../../../helpers");
const providers_1 = require("../providers");
const common_1 = require("../common");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const get_1 = __importDefault(require("lodash/get"));
class CrashReportNetworkRequest extends helpers_1.BaseNetworkRequest {
}
class MTCrashReportService extends providers_1.BaseCrashReportProvider {
    constructor() {
        super({ scope: MTCrashReportService.name });
        this.rsa = helpers_1.RSA.withAlgorithm();
        this.crashReportNetworkRequest = new CrashReportNetworkRequest({
            name: CrashReportNetworkRequest.name,
            scope: MTCrashReportService.name,
            networkOptions: {
                baseURL: common_1.MTEndpoints.BASE_URL,
            },
        });
    }
    sendReport(opts) {
        var _a;
        const { options: { projectId, eventName, publicKey, environment = process.env.NODE_ENV, generateBodyFn }, error, } = opts;
        if (!publicKey || (0, isEmpty_1.default)(publicKey)) {
            this.logger.error('[sendReport] Invalid public key to send crash report!');
            return;
        }
        const trace = Object.getOwnPropertyNames(error).reduce((prev, el) => {
            return Object.assign(Object.assign({}, prev), { [el]: (0, get_1.default)(error, el, null) });
        }, {});
        const body = (_a = generateBodyFn === null || generateBodyFn === void 0 ? void 0 : generateBodyFn()) !== null && _a !== void 0 ? _a : {
            appVersion: process.env.npm_package_version,
            appType: eventName,
            eventType: error.name,
            trace,
            projectId,
            environment,
        };
        const stringified = JSON.stringify({ projectId, environment });
        Promise.resolve(this.rsa.encrypt(stringified, publicKey))
            .then(signature => {
            this.crashReportNetworkRequest
                .getNetworkService()
                .send({
                url: this.crashReportNetworkRequest.getRequestUrl({
                    paths: [common_1.MTEndpoints.EVENTS],
                }),
                method: 'post',
                body: Object.assign(Object.assign({}, body), { signature }),
            })
                .then(() => {
                this.logger.info('[sendReport] Provider: %s | Successfully sent crash report to endpoint', 'MT_CRASH_REPORT');
            })
                .catch(err => {
                this.logger.error('[sendReport] Provider: %s | Failed to send crash report to endpoint | Error: %s', 'MT_CRASH_REPORT', err);
            });
        })
            .catch(err => {
            this.logger.error('[sendReport] Provider: %s | Failed to encrypt crash report | Error: %s', 'MT_CRASH_REPORT', err);
        });
    }
}
exports.MTCrashReportService = MTCrashReportService;
//# sourceMappingURL=mt-crash-report.service.js.map