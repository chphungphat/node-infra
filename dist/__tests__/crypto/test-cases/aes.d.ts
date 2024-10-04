import { ValueOrPromise } from '../../../common';
import { TestCaseHandler, TTestCaseDecision } from '../../../helpers';
interface IArg {
    secretKey: string;
    message: string;
}
export declare class TestAES001Handler extends TestCaseHandler<{}, IArg> {
    execute(): {
        encrypted: string;
        decrypted: string;
        message: string;
    };
    getValidator(): ((opts: Awaited<ReturnType<typeof this.execute>>) => ValueOrPromise<TTestCaseDecision>) | null;
}
export {};
