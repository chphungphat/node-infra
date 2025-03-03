import { BaseHelper } from '../../base/base.helper';
import { ValueOrPromise } from '../../common/types';
import { dayjs } from '@/utilities/date.utility';
import { ListenOptions, Socket as SocketClient, createServer } from 'net';
interface ITcpSocketClient {
    id: string;
    socket: SocketClient;
    state: 'unauthorized' | 'authenticating' | 'authenticated';
    subscriptions: Set<string>;
    storage: {
        connectedAt: dayjs.Dayjs;
        authenticatedAt: dayjs.Dayjs | null;
        [additionField: symbol | string]: any;
    };
}
export interface ITcpSocketServerOptions {
    identifier: string;
    serverOptions: Partial<ListenOptions>;
    authenticateOptions: {
        required: boolean;
        duration?: number;
    };
    extraEvents?: Record<string, (opts: {
        id: string;
        socket: SocketClient;
        args: any;
    }) => ValueOrPromise<void>>;
    onServerReady?: (opts: {
        server: ReturnType<typeof createServer>;
    }) => void;
    onClientConnected?: (opts: {
        id: string;
        socket: SocketClient;
    }) => void;
    onClientData?: (opts: {
        id: string;
        socket: SocketClient;
        data: Buffer | string;
    }) => void;
    onClientClose?: (opts: {
        id: string;
        socket: SocketClient;
    }) => void;
    onClientError?: (opts: {
        id: string;
        socket: SocketClient;
        error: Error;
    }) => void;
}
export declare class NetworkTcpServer extends BaseHelper {
    private serverOptions;
    private authenticateOptions;
    private clients;
    private server;
    private extraEvents;
    private onServerReady?;
    private onClientConnected?;
    private onClientData?;
    private onClientClose?;
    private onClientError?;
    constructor(opts: ITcpSocketServerOptions);
    static newInstance(opts: ITcpSocketServerOptions): NetworkTcpServer;
    configure(): void;
    onNewConnection(opts: {
        socket: SocketClient;
    }): void;
    getClients(): Record<string, ITcpSocketClient>;
    getClient(opts: {
        id: string;
    }): ITcpSocketClient;
    getServer(): import("net").Server;
    doAuthenticate(opts: {
        id: string;
        state: 'unauthorized' | 'authenticating' | 'authenticated';
    }): void;
    emit(opts: {
        clientId: string;
        payload: Buffer | string;
    }): void;
}
export {};
