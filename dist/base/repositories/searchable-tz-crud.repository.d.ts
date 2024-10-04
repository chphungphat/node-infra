import { AnyType, EntityClassType, EntityRelationType, IdType, TRelationType } from '../../common/types';
import { DataObject, Getter, Inclusion, juggler, Options, Where } from '@loopback/repository';
import { BaseObjectSearchTzEntity, BaseSearchableTzEntity, BaseTextSearchTzEntity, BaseTzEntity } from '../base.model';
import { TzCrudRepository } from './tz-crud.repository';
export declare abstract class SearchableTzCrudRepository<E extends BaseTextSearchTzEntity | BaseObjectSearchTzEntity | BaseSearchableTzEntity, R extends EntityRelationType = AnyType> extends TzCrudRepository<E, R> {
    protected readonly searchableInclusions: Inclusion[];
    protected readonly isInclusionRelations: boolean;
    constructor(entityClass: EntityClassType<E>, dataSource: juggler.DataSource, opts: {
        isInclusionRelations: boolean;
        searchableInclusions?: Inclusion[];
    }, scope?: string);
    abstract renderTextSearch(opts: {
        data?: DataObject<E>;
        entity: E & R;
    }): string;
    abstract renderObjectSearch(opts: {
        data?: DataObject<E>;
        entity: E & R;
    }): object;
    abstract onInclusionChanged<RM extends BaseTzEntity>(opts: {
        relation: string;
        relationRepository: TzCrudRepository<RM>;
        entities: RM[];
        options?: Options;
    }): Promise<void>;
    protected registerOnInclusionChanged<RM extends BaseTzEntity>(relation: string, relationRepositoryGetter: Getter<TzCrudRepository<RM>>): Promise<void>;
    protected handleInclusionChanged<RM extends BaseTzEntity>(opts: {
        relationName: string;
        relationType: TRelationType;
        entities: RM[];
        relationRepository: TzCrudRepository<RM>;
        options?: Options;
    }): Promise<void>;
    private renderSearchable;
    mixSearchFields(data: DataObject<E>, options?: Options & {
        where?: Where;
    }): Promise<DataObject<E>>;
    create(data: DataObject<E>, options?: Options): Promise<E>;
    createAll(data: DataObject<E>[], options?: Options): Promise<E[]>;
    updateById(id: IdType, data: DataObject<E>, options?: Options): Promise<void>;
    replaceById(id: IdType, data: DataObject<E>, options?: Options): Promise<void>;
}
