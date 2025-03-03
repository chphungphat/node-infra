import { EntityRelationType, ICrudMethodOptions, ICrudService, IdType } from '../../common';
import { Count, Filter, Where } from '@loopback/repository';
import { BaseTzEntity } from '../base.model';
import { BaseService } from './base.service';
import { AbstractTzRepository } from '../repositories';
export declare abstract class BaseCrudService<E extends BaseTzEntity> extends BaseService implements ICrudService<E> {
    repository: AbstractTzRepository<E, EntityRelationType>;
    constructor(opts: {
        scope: string;
        repository: AbstractTzRepository<E, EntityRelationType>;
    });
    find(filter: Filter<E>, _options: ICrudMethodOptions): Promise<(E & EntityRelationType)[]>;
    findById(id: IdType, filter: Filter<E>, _options: ICrudMethodOptions): Promise<E & EntityRelationType>;
    findOne(filter: Filter<E>, _options: ICrudMethodOptions): Promise<(E & EntityRelationType) | null>;
    count(where: Where<E>, _options: ICrudMethodOptions): Promise<Count>;
    create(data: Omit<E, 'id'>, options: ICrudMethodOptions): Promise<E>;
    updateAll(data: Partial<E>, where: Where<E>, options: ICrudMethodOptions): Promise<Count>;
    updateWithReturn(id: IdType, data: Partial<E>, options: ICrudMethodOptions): Promise<E>;
    replaceById(id: IdType, data: E, options: ICrudMethodOptions): Promise<E>;
    deleteById(id: IdType, _options: ICrudMethodOptions): Promise<{
        id: IdType;
    }>;
}
