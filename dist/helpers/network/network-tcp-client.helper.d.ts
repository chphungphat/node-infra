import { Socket as SocketClient } from 'net';
import { BaseHelper } from '../../base/base.helper';
interface INetworkTcpClientProps {
    identifier: string;
    options: {
        host: string;
        port: number;
        localAddress?: string;
    };
    reconnect?: boolean;
    maxRetry?: number;
    encoding?: BufferEncoding;
    onConnected?: () => void;
    onData?: (opts: {
        identifier: string;
        message: string | Buffer;
    }) => void;
    onClosed?: () => void;
    onError?: (error: any) => void;
}
export declare class NetworkTcpClient extends BaseHelper {
    private client?;
    private options;
    private reconnect?;
    private retry;
    private reconnectTimeout;
    private encoding?;
    private onConnected;
    private onData;
    private onClosed?;
    private onError?;
    constructor(opts: INetworkTcpClientProps);
    static newInstance(opts: INetworkTcpClientProps): NetworkTcpClient;
    getClient(): SocketClient | null | undefined;
    handleConnected(): void;
    handleData(raw: any): void;
    handleClosed(): void;
    handleError(error: any): void;
    connect(opts: {
        resetReconnectCounter: boolean;
    }): void;
    disconnect(): void;
    forceReconnect(): void;
    isConnected(): boolean | null | undefined;
    emit(opts: {
        payload: Buffer | string;
    }): void;
}
export {};
