import { AnyType, EntityClassType, EntityRelationType, IdType, ITzRepository } from '../../common/types';
import { ApplicationLogger } from '../../helpers';
import { AnyObject, WhereBuilder as BaseWhereBuilder, Command, Count, DataObject, DefaultCrudRepository as _DefaultCrudRepository, DefaultKeyValueRepository, IsolationLevel, juggler, NamedParameters, Options, PositionalParameters, Transaction, TransactionalEntityRepository, Where, HasManyRepositoryFactory, Getter, EntityCrudRepository } from '@loopback/repository';
import { BaseEntity, BaseKVEntity, BaseTzEntity } from '../base.model';
export declare class WhereBuilder<E extends object = AnyObject> extends BaseWhereBuilder {
    constructor(opts?: Where<E>);
    newInstance(opts?: Where<E>): WhereBuilder<E>;
    clone(): WhereBuilder;
}
export declare class DefaultCrudRepository<E extends BaseEntity, ID, Relations extends object = {}> extends _DefaultCrudRepository<E, ID, Relations> {
    /**
     * @experimental
     */
    createHasManyPolymorphicRepositoryFactoryFor<Target extends BaseEntity, TargetId extends IdType, ForeignKeyType extends IdType>(opts: {
        relationName: string;
        principalType: string;
        targetRepositoryGetter: Getter<EntityCrudRepository<Target, TargetId>>;
    }): HasManyRepositoryFactory<Target, ForeignKeyType>;
}
export declare abstract class AbstractTzRepository<E extends BaseTzEntity, R extends EntityRelationType = AnyType> extends DefaultCrudRepository<E, IdType, R> implements ITzRepository<E>, TransactionalEntityRepository<E, IdType, R> {
    protected logger: ApplicationLogger;
    constructor(entityClass: EntityClassType<E>, dataSource: juggler.DataSource, scope?: string);
    beginTransaction(options?: IsolationLevel | Options): Promise<Transaction>;
    executeSql<T>(command: Command, parameters: NamedParameters | PositionalParameters, options?: Options): Promise<T>;
    protected getObservers(opts: {
        operation: string;
    }): Array<Function>;
    protected notifyObservers(opts: {
        operation: string;
        [extra: symbol | string]: unknown | string;
    }): void;
    abstract mixTimestamp(entity: DataObject<E>, options?: {
        newInstance: boolean;
        ignoreModified?: boolean;
    }): DataObject<E>;
    abstract mixUserAudit(entity: DataObject<E>, options?: {
        newInstance: boolean;
        authorId: IdType;
    }): DataObject<E>;
    abstract existsWith(where?: Where<E>, options?: any): Promise<boolean>;
    abstract createWithReturn(data: DataObject<E>, options?: any): Promise<E>;
    abstract updateWithReturn(id: IdType, data: DataObject<E>, options?: any): Promise<E>;
    abstract upsertWith(data: DataObject<E>, where: Where<E>, options?: any): Promise<E | null>;
}
export declare abstract class AbstractKVRepository<E extends BaseKVEntity> extends DefaultKeyValueRepository<E> {
    constructor(entityClass: EntityClassType<E>, dataSource: juggler.DataSource);
}
export declare abstract class KVRepository<E extends BaseKVEntity> extends AbstractKVRepository<E> {
    constructor(entityClass: EntityClassType<E>, dataSource: juggler.DataSource);
}
export declare abstract class ViewRepository<E extends BaseEntity, R extends EntityRelationType = AnyType> extends DefaultCrudRepository<E, IdType, R> {
    constructor(entityClass: EntityClassType<E>, dataSource: juggler.DataSource);
    existsWith(where?: Where<E>, options?: Options): Promise<boolean>;
    create(_data: DataObject<E>, _options?: Options): Promise<E>;
    createAll(_datum: DataObject<E>[], _options?: Options): Promise<E[]>;
    save(_entity: E, _options?: Options): Promise<E>;
    update(_entity: E, _options?: Options): Promise<void>;
    delete(_entity: E, _options?: Options): Promise<void>;
    updateAll(_data: DataObject<E>, _where?: Where<E>, _options?: Options): Promise<Count>;
    updateById(_id: IdType, _data: DataObject<E>, _options?: Options): Promise<void>;
    replaceById(_id: IdType, _data: DataObject<E>, _options?: Options): Promise<void>;
    deleteAll(_where?: Where<E>, _options?: Options): Promise<Count>;
    deleteById(_id: IdType, _options?: Options): Promise<void>;
}
