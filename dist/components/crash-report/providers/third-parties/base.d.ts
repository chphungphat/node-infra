import { ApplicationLogger } from '../../../../helpers';
import { ICrashReportProvider, ISendReport } from '../../common';
import { ValueOrPromise } from '../../../../common';
export declare abstract class AbstractCrashReportProvider implements ICrashReportProvider {
    abstract sendReport(opts: ISendReport): ValueOrPromise<void>;
}
export declare abstract class BaseCrashReportProvider extends AbstractCrashReportProvider {
    protected logger: ApplicationLogger;
    constructor(opts?: {
        scope?: string;
    });
}
