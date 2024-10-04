import { BaseCrashReportProvider } from '../providers';
import { ISendReport } from '../common';
export declare class MTCrashReportService extends BaseCrashReportProvider {
    private crashReportNetworkRequest;
    private rsa;
    constructor();
    sendReport(opts: ISendReport): void;
}
