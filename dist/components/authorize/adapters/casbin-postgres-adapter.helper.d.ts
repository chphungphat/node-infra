import { BaseDataSource } from '../../../base/base.datasource';
import { Model } from 'casbin';
import { IEnforcerFilterValue } from '../common';
import { AbstractCasbinAdapter } from './base.adapter';
export declare class CasbinPostgresAdapter extends AbstractCasbinAdapter {
    constructor(datasource: BaseDataSource);
    generateGroupLine(rule: {
        userId: number;
        roleId: number;
    }): string;
    loadFilteredPolicy(model: Model, filter: IEnforcerFilterValue): Promise<void>;
}
