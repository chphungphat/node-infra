import { BaseDataSource } from '../../base/datasources';
import { IPostgresOptions } from './types';
export declare class PostgresDataSource extends BaseDataSource {
    static dataSourceName: string;
    static readonly defaultConfig: IPostgresOptions;
    constructor(dsConfig?: IPostgresOptions);
}
