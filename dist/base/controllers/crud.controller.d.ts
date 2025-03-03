import { Getter } from '@loopback/core';
import { CrudRestControllerOptions } from '@loopback/rest-crud';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { SchemaRef } from '@loopback/rest';
import { BaseIdEntity, BaseTzEntity, AbstractTzRepository } from './../';
import { EntityRelationType, IdType } from '../../common/types';
import { IJWTTokenPayload } from '../../components/authenticate/common/types';
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
    doInjectCurrentUser?: boolean;
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
} | {
    new (repository: AbstractTzRepository<E, EntityRelationType>, getCurrentUser?: Getter<IJWTTokenPayload>): {
        getCurrentUser?: Getter<IJWTTokenPayload>;
        _getContextUser(): Promise<{
            userId: IdType;
            roles: {
                id: IdType;
                identifier: string;
                priority: number;
            }[];
        } | null>;
        create(data: Omit<E, "id">): Promise<E>;
        updateAll(data: Partial<E>, where?: Where<E>): Promise<Count>;
        updateById(id: IdType, data: Partial<E>): Promise<E>;
        replaceById(id: IdType, data: E): Promise<E>;
        deleteById(id: IdType): Promise<{
            id: IdType;
        }>;
        repository: AbstractTzRepository<E, EntityRelationType>;
        defaultLimit: number;
        find(filter?: Filter<E>): Promise<(E & EntityRelationType)[]>;
        findById(id: IdType, filter?: FilterExcludingWhere<E>): Promise<E & EntityRelationType>;
        findOne(filter?: Filter<E>): Promise<(E & EntityRelationType) | null>;
        count(where?: Where<E>): Promise<Count>;
    };
};
