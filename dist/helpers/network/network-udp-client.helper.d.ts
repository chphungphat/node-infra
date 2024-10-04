import { BaseHelper } from '../../base/base.helper';
import { ValueOrPromise } from '../../common';
import dgram from 'dgram';
interface INetworkUdpClientProps {
    identifier: string;
    host?: string;
    port: number;
    reuseAddr?: boolean;
    multicastAddress?: {
        groups?: Array<string>;
        interface?: string;
    };
    onConnected?: (opts: {
        identifier: string;
        host?: string;
        port: number;
    }) => void;
    onData?: (opts: {
        identifier: string;
        message: string | Buffer;
        remoteInfo: dgram.RemoteInfo;
    }) => void;
    onClosed?: (opts: {
        identifier: string;
        host?: string;
        port: number;
    }) => void;
    onError?: (opts: {
        identifier: string;
        host?: string;
        port: number;
        error: Error;
    }) => void;
    onBind?: (opts: {
        identifier: string;
        socket: dgram.Socket;
        host?: string;
        port: number;
        reuseAddr?: boolean;
        multicastAddress?: {
            groups?: Array<string>;
            interface?: string;
        };
    }) => ValueOrPromise<void>;
}
export declare class NetworkUdpClient extends BaseHelper {
    private host?;
    private port;
    private reuseAddr?;
    private multicastAddress?;
    private onConnected;
    private onData;
    private onClosed?;
    private onError?;
    private onBind?;
    private client?;
    constructor(opts: INetworkUdpClientProps);
    static newInstance(opts: INetworkUdpClientProps): NetworkUdpClient;
    getClient(): dgram.Socket | null | undefined;
    handleConnected(): void;
    handleData(opts: {
        identifier: string;
        message: string | Buffer;
        remoteInfo: dgram.RemoteInfo;
    }): void;
    handleClosed(): void;
    handleError(opts: {
        identifier: string;
        error: Error;
    }): void;
    connect(): void;
    disconnect(): void;
    isConnected(): dgram.Socket | null | undefined;
}
export {};
