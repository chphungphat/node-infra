import { BaseDataSource } from '../../../base/base.datasource';
import { Model } from 'casbin';
import { AbstractCasbinAdapter } from './base.adapter';
export declare class CasbinRedisAdapter extends AbstractCasbinAdapter {
    constructor(datasource: BaseDataSource);
    loadFilteredPolicy(_model: Model, _filter: any): Promise<void>;
}
