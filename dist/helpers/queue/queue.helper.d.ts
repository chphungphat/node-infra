import { BaseHelper } from '../../base/base.helper';
import { ValueOf, ValueOrPromise } from '../../common/types';
export declare class QueueStatuses {
    static readonly WAITING = "000_WAITING";
    static readonly PROCESSING = "100_PROCESSING";
    static readonly LOCKED = "200_LOCKED";
    static readonly SETTLED = "300_SETTLED";
    static readonly SCHEME_SET: Set<string>;
    static isValid(scheme: string): boolean;
}
export type TQueueStatus = ValueOf<Omit<typeof QueueStatuses, 'isValid' | 'SCHEME_SET'>>;
export type TQueueElement<T> = {
    isLocked: boolean;
    payload: T;
};
interface IQueueCallback<TElementPayload> {
    autoDispatch?: boolean;
    onMessage?: (opts: {
        identifier: string;
        queueElement: TQueueElement<TElementPayload>;
    }) => ValueOrPromise<void>;
    onDataEnqueue?: (opts: {
        identifier: string;
        queueElement: TQueueElement<TElementPayload>;
    }) => ValueOrPromise<void>;
    onDataDequeue?: (opts: {
        identifier: string;
        queueElement: TQueueElement<TElementPayload>;
    }) => ValueOrPromise<void>;
}
export declare class QueueHelper<TElementPayload> extends BaseHelper {
    storage: Array<TQueueElement<TElementPayload>>;
    private processingEvents;
    private generator;
    private totalEvent;
    private autoDispatch;
    private state;
    private isSettleRequested;
    private onMessage?;
    private onDataEnqueue?;
    private onDataDequeue?;
    constructor(opts: IQueueCallback<TElementPayload> & {
        identifier: string;
    });
    private handleMessage;
    private _messageListener;
    nextMessage(): void;
    enqueue(payload: TElementPayload): Promise<void>;
    dequeue(): TQueueElement<TElementPayload> | undefined;
    lock(): void;
    unlock(opts: {
        shouldProcessNextElement?: boolean;
    }): void;
    settle(): void;
    isSettled(): boolean;
    close(): void;
    getElementAt(position: number): TQueueElement<TElementPayload>;
    getState(): TQueueStatus;
    getTotalEvent(): number;
    getProcessingEvents(): Set<TQueueElement<TElementPayload>>;
}
export {};
