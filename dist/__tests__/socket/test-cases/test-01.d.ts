import { ValueOrPromise } from '../../../common';
import { NetworkTcpClient, NetworkTcpServer, TestCaseHandler, TTestCaseDecision } from '../../../helpers';
interface IArg {
    host: string;
    port: number;
}
export declare class TestSocket001Handler extends TestCaseHandler<{}, IArg> {
    execute(): Promise<{
        server: NetworkTcpServer;
        client: NetworkTcpClient;
    }>;
    getValidator(): ((opts: Awaited<ReturnType<typeof this.execute>>) => ValueOrPromise<TTestCaseDecision>) | null;
}
export {};
