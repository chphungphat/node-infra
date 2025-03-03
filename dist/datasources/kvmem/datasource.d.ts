import { BaseDataSource, IDataSourceOptions } from '../../base/datasources';
export declare class KvMemDataSource extends BaseDataSource<IDataSourceOptions> {
    static dataSourceName: string;
    constructor(settings?: IDataSourceOptions);
}
