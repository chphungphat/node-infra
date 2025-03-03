import { BaseDataSource } from '../../../base/datasources';
import { ApplicationLogger } from '../../../helpers';
import { FilteredAdapter, Model } from 'casbin';
export declare abstract class AbstractCasbinAdapter implements FilteredAdapter {
    protected logger: ApplicationLogger;
    protected datasource: BaseDataSource;
    constructor(opts: {
        scope: string;
        datasource: BaseDataSource;
    });
    abstract loadFilteredPolicy(model: Model, filter: any): Promise<void>;
    isFiltered(): boolean;
    loadPolicy(_: Model): Promise<void>;
    savePolicy(model: Model): Promise<boolean>;
    addPolicy(sec: string, ptype: string, rule: string[]): Promise<void>;
    removePolicy(sec: string, ptype: string, rule: string[]): Promise<void>;
    removeFilteredPolicy(sec: string, ptype: string, fieldIndex: number, ...fieldValues: string[]): Promise<void>;
}
