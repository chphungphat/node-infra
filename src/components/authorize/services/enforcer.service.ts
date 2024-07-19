import { BaseDataSource } from '@/base';
import { AuthorizerKeys, IdType } from '@/common';
import { ApplicationLogger, CasbinLBAdapter, EnforcerFilterValue, LoggerFactory } from '@/helpers';
import { getError } from '@/utilities';
import { BindingScope, inject, injectable } from '@loopback/core';
import { Enforcer, newCachedEnforcer, newEnforcer } from 'casbin';
import fs from 'fs';
import isEmpty from 'lodash/isEmpty';

@injectable({ scope: BindingScope.SINGLETON })
export class EnforcerService {
  private logger: ApplicationLogger;

  private enforcer: Enforcer;

  constructor(
    @inject(AuthorizerKeys.CONFIGURE_OPTIONS) protected options: { confPath: string; useCache?: boolean },
    @inject(AuthorizerKeys.AUTHORIZE_DATASOURCE) protected dataSource: BaseDataSource,
  ) {
    this.logger = LoggerFactory.getLogger([EnforcerService.name]);
  }

  async getEnforcer(): Promise<Enforcer> {
    if (this.enforcer) {
      return this.enforcer;
    }

    this.logger.debug('[getEnforcer] Enforcer Options: ', this.options);
    const { confPath, useCache } = this.options;

    if (!confPath || isEmpty(confPath)) {
      this.logger.error('[getEnforcer] Invalid configure path | confPath: %s', confPath);
      throw getError({
        statusCode: 500,
        message: `[getEnforcer] Invalid enforcer configuration path | confPath: ${confPath}`,
      });
    }

    if (!fs.existsSync(confPath)) {
      this.logger.error('[getEnforcer] Please check again configure path | confPath: %s', confPath);
      throw getError({
        statusCode: 500,
        message: `[getEnforcer] Enforcer configuration path is not existed | confPath: ${confPath}`,
      });
    }

    this.logger.info(
      '[getEnforcer] Creating new Enforcer with configure path: %s | dataSource: %s',
      confPath,
      this.dataSource.name,
    );

    const lbAdapter = new CasbinLBAdapter(this.dataSource);

    if (useCache) {
      this.enforcer = await newCachedEnforcer(confPath, lbAdapter);
    } else {
      this.enforcer = await newEnforcer(confPath, lbAdapter);
    }

    this.logger.debug('[getEnforcer] Created new enforcer | Configure path: %s', confPath);
    return this.enforcer;
  }

  // -----------------------------------------------------------------------------------------
  async getTypeEnforcer(id: IdType): Promise<Enforcer | null> {
    const enforcer = await this.getEnforcer();
    if (!enforcer) {
      return null;
    }

    const filterValue: EnforcerFilterValue = {
      principalType: 'User',
      principalValue: id,
    };

    await enforcer.loadFilteredPolicy(filterValue);
    return enforcer;
  }
}
