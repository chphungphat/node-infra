import { BaseDataSource } from '../../../base/datasources';
import { TzCrudRepository } from '../../../base/repositories';
import { EntityClassType } from '../../../common';
import { Migration } from '../models';
export declare class BaseMigrationRepository<T extends Migration> extends TzCrudRepository<T> {
    constructor(opts: {
        entityClass: EntityClassType<T>;
        dataSource: BaseDataSource;
    });
}
export declare class MigrationRepository extends BaseMigrationRepository<Migration> {
    constructor(dataSource: BaseDataSource);
}
