import { BaseHelper } from '../base/base.helper';
import { CronJob, CronOnCompleteCommand } from 'cron';
export interface ICronHelperOptions {
    cronTime: string;
    onTick: () => void | Promise<void>;
    onCompleted?: CronOnCompleteCommand;
    autoStart?: boolean;
    tz?: string;
    utcOffset?: number;
    runOnInit?: boolean;
    errorHandler?: (error: unknown) => void;
}
export declare class CronHelper extends BaseHelper {
    private cronTime;
    private onTick;
    private onCompleted?;
    private autoStart;
    private tz?;
    private utcOffset?;
    private runOnInit?;
    private errorHandler?;
    instance: CronJob;
    constructor(opts: ICronHelperOptions);
    static newInstance(opts: ICronHelperOptions): CronHelper;
    configure(): void;
    start(): void;
    modifyCronTime(cronTime: string): void;
}
