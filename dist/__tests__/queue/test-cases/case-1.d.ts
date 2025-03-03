import { ValueOrPromise } from '../../../common';
import { QueueHelper, TestCaseHandler, TTestCaseDecision } from '../../../helpers';
interface IArg {
}
export declare class TestQueue001Handler extends TestCaseHandler<{}, IArg> {
    execute(): Promise<QueueHelper<{
        date: string;
    }>>;
    getValidator(): ((opts: Awaited<ReturnType<typeof this.execute>>) => ValueOrPromise<TTestCaseDecision>) | null;
}
export {};
