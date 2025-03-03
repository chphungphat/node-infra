import { BaseDataSource } from '../../base/datasources';
import { Options } from '@loopback/repository';
import { IRedisConnector, IRedisOptions } from './types';
export declare class RedisDataSource extends BaseDataSource<IRedisOptions> {
    static dataSourceName: string;
    constructor(settings?: IRedisOptions);
    getConnector(): IRedisConnector;
    execute<R extends object = any>(command: string, parameters?: Array<string | number> | string | number | object, extra?: Options): Promise<R>;
}
