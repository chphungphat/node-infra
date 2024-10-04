"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrashReportProviderKeys = exports.CrashReportKeys = void 0;
class CrashReportKeys {
}
exports.CrashReportKeys = CrashReportKeys;
CrashReportKeys.REPORT_PROVIDERS = '@app/crash-report/report-providers';
CrashReportKeys.THIRD_PARTY_PROVIDER = '@app/crash-report/third-party-provider';
class CrashReportProviderKeys {
    static isValid(opts) {
        return this.TYPE_SET.has(opts.identifier);
    }
}
exports.CrashReportProviderKeys = CrashReportProviderKeys;
_a = CrashReportProviderKeys;
CrashReportProviderKeys.MT_PROVIDER = '@app/crash-report/mt-provider';
CrashReportProviderKeys.SENTRY_PROVIDER = '@app/crash-report/sentry-provider';
CrashReportProviderKeys.TYPE_SET = new Set([_a.MT_PROVIDER, _a.SENTRY_PROVIDER]);
//# sourceMappingURL=keys.js.map