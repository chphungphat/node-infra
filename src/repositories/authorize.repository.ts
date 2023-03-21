import { BaseDataSource } from '@/base/base.datasource';
import { BaseTzEntity } from '@/base/base.model';
import { TzCrudRepository } from '@/base/base.repository';
import { EntityClassType } from '@/common';

// ----------------------------------------------------------------------------
export abstract class AbstractAuthorizeRepository<T extends BaseTzEntity> extends TzCrudRepository<T> {
  constructor(entityClass: EntityClassType<T>, dataSource: BaseDataSource) {
    super(entityClass, dataSource);

    this.bindingRelations();
  }

  abstract bindingRelations(): void;
}
