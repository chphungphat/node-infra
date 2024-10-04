import { AnyType, EntityClassType, EntityRelationType, IdType } from '../../common/types';
import { Count, DataObject, juggler, Options, Where } from '@loopback/repository';
import { BaseTzEntity } from '../base.model';
import { AbstractTzRepository } from './base.repository';
export declare abstract class TzCrudRepository<E extends BaseTzEntity, R extends EntityRelationType = AnyType> extends AbstractTzRepository<E, R> {
    constructor(entityClass: EntityClassType<E>, dataSource: juggler.DataSource, scope?: string);
    existsWith(where?: Where<E>, options?: Options): Promise<boolean>;
    create(data: DataObject<E>, options?: Options & {
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<E>;
    createAll(datum: DataObject<E>[], options?: Options & {
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<E[]>;
    createWithReturn(data: DataObject<E>, options?: Options & {
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<E>;
    updateById(id: IdType, data: DataObject<E>, options?: Options & {
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<void>;
    updateWithReturn(id: IdType, data: DataObject<E>, options?: Options & {
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<E>;
    updateAll(data: DataObject<E>, where?: Where<E>, options?: Options & {
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<Count>;
    upsertWith(data: DataObject<E>, where: Where<E>, options?: Options & {
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<E | null>;
    replaceById(id: IdType, data: DataObject<E>, options?: Options & {
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<void>;
    private _softDelete;
    softDelete(where: Where<E>, options?: Options & {
        databaseSchema?: string;
        connectorType?: string;
        softDeleteField?: string;
        authorId?: IdType;
        ignoreModified?: boolean;
    }): Promise<Count>;
    mixTimestamp(entity: DataObject<E>, options?: Options & {
        newInstance?: boolean;
        ignoreModified?: boolean;
    }): DataObject<E>;
    mixUserAudit(entity: DataObject<E>, options?: {
        newInstance: boolean;
        authorId?: IdType;
    } | undefined): DataObject<E>;
    _deleteWithReturn(where: Where<E>, options?: Options): Promise<{
        count: Count;
        data: (E & R)[];
    }>;
    deleteWithReturn(where: Where<E>, options?: Options): Promise<{
        count: Count;
        data: (E & R)[];
    }>;
}
