import { BaseHelper } from '../base/base.helper';
import Redis from 'ioredis';
export interface IRedisHelperProps {
    name: string;
    host: string;
    port: string | number;
    password: string;
    database?: number;
    autoConnect?: boolean;
    maxRetry?: number;
}
export interface IRedisHelperCallbacks {
    onInitialized?: (opts: {
        name: string;
        helper: RedisHelper;
    }) => void;
    onConnected?: (opts: {
        name: string;
        helper: RedisHelper;
    }) => void;
    onReady?: (opts: {
        name: string;
        helper: RedisHelper;
    }) => void;
    onError?: (opts: {
        name: string;
        helper: RedisHelper;
        error: any;
    }) => void;
}
export interface IRedisHelperOptions extends IRedisHelperProps, IRedisHelperCallbacks {
}
export declare class RedisHelper extends BaseHelper {
    client: Redis;
    name: string;
    constructor(options: IRedisHelperOptions);
    ping(): Promise<"PONG">;
    connect(): Promise<boolean>;
    disconnect(): Promise<boolean>;
    set(opts: {
        key: string;
        value: any;
        options?: {
            log: boolean;
        };
    }): Promise<void>;
    get(opts: {
        key: string;
        transform?: (input: string) => any;
    }): Promise<any>;
    del(opts: {
        keys: Array<string>;
    }): Promise<number>;
    getString(opts: {
        key: string;
    }): Promise<any>;
    getStrings(opts: {
        keys: Array<string>;
    }): Promise<any[] | null>;
    getObject(opts: {
        key: string;
    }): Promise<any>;
    getObjects(opts: {
        keys: Array<string>;
    }): Promise<any[] | null>;
    hset(opts: {
        key: string;
        value: any;
        options?: {
            log: boolean;
        };
    }): Promise<number | undefined>;
    hSet(opts: {
        key: string;
        value: any;
        options?: {
            log: boolean;
        };
    }): Promise<number | undefined>;
    hgetall(opts: {
        key: string;
        transform?: <T, R>(input: T) => R;
    }): Promise<unknown>;
    hGetAll(opts: {
        key: string;
        transform?: <T, R>(input: T) => R;
    }): Promise<unknown>;
    mset(opts: {
        payload: Array<{
            key: string;
            value: any;
        }>;
        options?: {
            log: boolean;
        };
    }): Promise<void>;
    mSet(opts: {
        payload: Array<{
            key: string;
            value: any;
        }>;
        options?: {
            log: boolean;
        };
    }): Promise<void>;
    mget(opts: {
        keys: Array<string>;
        transform?: (input: string) => any;
    }): Promise<any[] | null>;
    mGet(opts: {
        keys: Array<string>;
        transform?: (input: string) => any;
    }): Promise<any[] | null>;
    keys(opts: {
        key: string;
    }): Promise<string[]>;
    jSet<T = any>(opts: {
        key: string;
        path: string;
        value: T;
    }): Promise<any>;
    jGet<T = any>(opts: {
        key: string;
        path?: string;
    }): Promise<T>;
    jDelete(opts: {
        key: string;
        path?: string;
    }): Promise<number>;
    jNumberIncreaseBy(opts: {
        key: string;
        path: string;
        value: number;
    }): Promise<any>;
    jStringAppend(opts: {
        key: string;
        path: string;
        value: string;
    }): Promise<any>;
    jPush<T = any>(opts: {
        key: string;
        path: string;
        value: T;
    }): Promise<any>;
    jPop<T = any>(opts: {
        key: string;
        path: string;
    }): Promise<T>;
    execute<R = any>(command: string, parameters?: Array<string | number | Buffer>): Promise<R>;
    publish<T = any>(opts: {
        topics: Array<string>;
        payload: T;
        useCompress?: boolean;
    }): Promise<void>;
    subscribe(opts: {
        topic: string;
    }): void;
}
