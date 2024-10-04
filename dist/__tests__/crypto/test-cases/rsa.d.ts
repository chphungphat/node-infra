import { ValueOrPromise } from '../../../common';
import { TestCaseHandler, TTestCaseDecision } from '../../../helpers';
interface IArg {
    message: string;
}
export declare class TestRSA001Handler extends TestCaseHandler<{}, IArg> {
    execute(): {
        encrypted: string;
        decrypted: string;
        message: string;
    };
    getValidator(): ((opts: Awaited<ReturnType<typeof this.execute>>) => ValueOrPromise<TTestCaseDecision>) | null;
}
export {};
