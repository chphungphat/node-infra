import { ISendReport } from '../common';
import { BaseCrashReportProvider } from '../providers';
export declare class MTCrashReportService extends BaseCrashReportProvider {
    private crashReportNetworkRequest;
    private rsa;
    constructor();
    sendReport(opts: ISendReport): void;
}
