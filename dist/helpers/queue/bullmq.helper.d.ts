import { Job, Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { TBullQueueRole } from '../../common/types';
import { BaseHelper } from '../../base/base.helper';
interface IBullMQOptions {
    queueName: string;
    identifier: string;
    role: TBullQueueRole;
    connection: Redis;
    numberOfWorker?: number;
    onWorkerData?: (job: Job) => Promise<any>;
    onWorkerDataCompleted?: (job: Job, result: any) => Promise<void>;
    onWorkerDataFail?: (job: Job | undefined, error: Error) => Promise<void>;
}
export declare class BullMQHelper extends BaseHelper {
    private queueName;
    private role;
    private connection;
    queue: Queue;
    worker: Worker;
    private numberOfWorker;
    private onWorkerData?;
    private onWorkerDataCompleted?;
    private onWorkerDataFail?;
    constructor(options: IBullMQOptions);
    static newInstance(opts: IBullMQOptions): BullMQHelper;
    configureQueue(): void;
    configureWorker(): void;
    configure(): void;
}
export {};
