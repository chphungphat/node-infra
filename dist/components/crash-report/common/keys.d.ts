import { TCrashReportProviders } from './types';
export declare class CrashReportKeys {
    static readonly REPORT_PROVIDERS = "@app/crash-report/report-providers";
    static readonly THIRD_PARTY_PROVIDER = "@app/crash-report/third-party-provider";
}
export declare class CrashReportProviderKeys {
    static readonly MT_PROVIDER: TCrashReportProviders;
    static readonly SENTRY_PROVIDER: TCrashReportProviders;
    static readonly SCHEME_SET: Set<TCrashReportProviders>;
    static isValid(opts: {
        identifier: string;
    }): boolean;
}
