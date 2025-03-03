import { RedisHelper } from '../../helpers';
import { Class, Entity, EntityData, Filter, Model, Options } from '@loopback/repository';
import { IRedisConnector, IRedisOptions } from './types';
import EventEmitter from 'events';
export declare class RedisConnector implements IRedisConnector {
    name: string;
    redisHelper: RedisHelper;
    settings: IRedisOptions;
    configModel?: Model | undefined;
    interfaces?: string[] | undefined;
    constructor(opts: {
        settings: IRedisOptions;
    });
    initialize<C extends EventEmitter & {
        initialized: boolean;
        connected: boolean;
        connecting: boolean;
        ready: boolean;
    }>(opts: {
        context: C;
    }): void;
    delete(_modelClass: Class<Entity>, key: string, _options?: Options): Promise<boolean>;
    deleteAll(_modelClass: Class<Entity>, _options?: Options): Promise<number>;
    get<T = any>(_modelClass: Class<Entity>, key: string, options?: Options): Promise<T>;
    set(_modelClass: Class<Entity>, key: string, value: EntityData, options?: Options & {
        log: boolean;
    }): Promise<boolean>;
    expire(_modelClass: Class<Entity>, _key: string, _ttl: number, _options?: Options): Promise<boolean>;
    ttl(_modelClass: Class<Entity>, key: string, _ttl: number, _options?: Options): Promise<number>;
    keys(_modelClass: Class<Entity>, _options?: Options): Promise<string[]>;
    iterateKeys?(_modelClass: Class<Entity>, _filter?: Filter, _options?: Options): Promise<Iterator<any, any, any>>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    ping(): Promise<void>;
    execute<R extends object = any>(command: string, parameters?: Array<string | number> | string | number | object, options?: Options): Promise<R>;
}
