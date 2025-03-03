import { BaseHelper } from '../../base/base.helper';
import { TBullQueueRole } from '../../common/types';
import { Job, Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
interface IBullMQOptions<TQueueElement = any, TQueueResult = any> {
    queueName: string;
    identifier: string;
    role: TBullQueueRole;
    connection: Redis;
    numberOfWorker?: number;
    lockDuration?: number;
    onWorkerData?: (job: Job<TQueueElement, TQueueResult>) => Promise<any>;
    onWorkerDataCompleted?: (job: Job<TQueueElement, TQueueResult>, result: any) => Promise<void>;
    onWorkerDataFail?: (job: Job<TQueueElement, TQueueResult> | undefined, error: Error) => Promise<void>;
}
export declare class BullMQHelper<TQueueElement = any, TQueueResult = any> extends BaseHelper {
    private queueName;
    private role;
    private connection;
    queue: Queue<TQueueElement, TQueueResult>;
    worker: Worker<TQueueElement, TQueueResult>;
    private numberOfWorker;
    private lockDuration;
    private onWorkerData?;
    private onWorkerDataCompleted?;
    private onWorkerDataFail?;
    constructor(options: IBullMQOptions<TQueueElement, TQueueResult>);
    static newInstance<T = any, R = any>(opts: IBullMQOptions<T, R>): BullMQHelper<T, R>;
    configureQueue(): void;
    configureWorker(): void;
    configure(): void;
}
export {};
