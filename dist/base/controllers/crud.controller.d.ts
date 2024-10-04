import { CrudRestControllerOptions } from '@loopback/rest-crud';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { SchemaRef } from '@loopback/rest';
import { BaseIdEntity, BaseTzEntity, AbstractTzRepository } from './../';
import { EntityRelationType, IdType } from '../../common/types';
export interface ICrudControllerOptions<E extends BaseIdEntity> {
    entity: typeof BaseIdEntity & {
        prototype: E;
    };
    repository: {
        name: string;
    };
    controller: CrudRestControllerOptions & {
        defaultLimit?: number;
    };
    schema?: {
        find?: SchemaRef;
        findOne?: SchemaRef;
        findById?: SchemaRef;
        count?: SchemaRef;
        createRequestBody?: SchemaRef;
        create?: SchemaRef;
        updateAll?: SchemaRef;
        updateByIdRequestBody?: SchemaRef;
        updateById?: SchemaRef;
        replaceById?: SchemaRef;
        deleteById?: SchemaRef;
    };
}
export declare const defineCrudController: <E extends BaseTzEntity>(opts: ICrudControllerOptions<E>) => {
    new (repository: AbstractTzRepository<E, EntityRelationType>): {
        repository: AbstractTzRepository<E, EntityRelationType>;
        defaultLimit: number;
        find(filter?: Filter<E>): Promise<(E & EntityRelationType)[]>;
        findById(id: IdType, filter?: FilterExcludingWhere<E>): Promise<E & EntityRelationType>;
        findOne(filter?: Filter<E>): Promise<(E & EntityRelationType) | null>;
        count(where?: Where<E>): Promise<Count>;
    };
};
