import Redis from 'ioredis';
import { Server as IOServer, Socket as IOSocket, ServerOptions } from 'socket.io';
import { Server } from 'http';
import { IHandshake } from './types';
export interface ISocketIOServerOptions {
    identifier: string;
    server: Server;
    serverOptions: Partial<ServerOptions>;
    redisConnection: Redis;
    authenticateFn: (args: IHandshake) => Promise<boolean>;
    clientConnectedFn: (opts: {
        socket: IOSocket;
    }) => Promise<void>;
    authenticateTimeout?: number;
    defaultRooms?: string[];
}
export declare class SocketIOServerHelper {
    private logger;
    private identifier;
    private server;
    private serverOptions;
    private redisConnection;
    private authenticateFn;
    private onClientConnected;
    private authenticateTimeout;
    private defaultRooms;
    private io;
    private emitter;
    private clients;
    constructor(opts: ISocketIOServerOptions);
    getIOServer(): IOServer;
    getClients(opts?: {
        id: string;
    }): {
        id: string;
        socket: IOSocket;
        state: "unauthorized" | "authenticating" | "authenticated";
        interval?: NodeJS.Timeout;
        authenticateTimeout: NodeJS.Timeout;
    } | Record<string, {
        id: string;
        socket: IOSocket;
        state: "unauthorized" | "authenticating" | "authenticated";
        interval?: NodeJS.Timeout;
        authenticateTimeout: NodeJS.Timeout;
    }>;
    on(opts: {
        topic: string;
        handler: (...args: any) => Promise<void>;
    }): void;
    configure(): void;
    onClientConnect(opts: {
        socket: IOSocket;
    }): void;
    onClientAuthenticated(opts: {
        socket: IOSocket;
    }): void;
    ping(opts: {
        socket: IOSocket;
        doIgnoreAuth: boolean;
    }): void;
    disconnect(opts: {
        socket: IOSocket;
    }): void;
    send(opts: {
        destination: string;
        payload: {
            topic: string;
            data: any;
        };
        doLog?: boolean;
        cb?: () => void;
    }): void;
}