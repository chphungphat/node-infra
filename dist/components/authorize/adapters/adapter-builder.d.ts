import { BaseDataSource } from '../../../base/datasources';
import { FilteredAdapter } from 'casbin';
import { TCasbinAdapter } from '../common';
export declare class CasbinAdapterBuilder {
    private static instance;
    private constructor();
    static getInstance(): CasbinAdapterBuilder;
    build(opts: {
        type: TCasbinAdapter;
        dataSource: BaseDataSource;
    }): FilteredAdapter;
}
