import { Getter } from '@loopback/core';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { SchemaRef, RequestContext } from '@loopback/rest';
import { CrudRestControllerOptions } from '@loopback/rest-crud';
import { EntityRelationType, ICrudService, IdType } from '../../common/types';
import { IJWTTokenPayload } from '../../components/authenticate/common/types';
import { BaseIdEntity, BaseTzEntity } from './../';
export interface IServiceCrudControllerOptions<E extends BaseIdEntity> {
    entity: typeof BaseIdEntity & {
        prototype: E;
    };
    service: {
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
    options?: {
        doInjectCurrentUser?: boolean;
    };
}
export declare const defineServiceCrudController: <E extends BaseTzEntity>(opts: IServiceCrudControllerOptions<E>) => {
    new (requestContext: RequestContext, service: ICrudService<E>, getCurrentUser?: Getter<IJWTTokenPayload>): {
        requestContext: RequestContext;
        service: ICrudService<E>;
        getCurrentUser?: Getter<IJWTTokenPayload>;
        defaultLimit: number;
        _getContextUser(): Promise<{
            userId: IdType;
            roles: {
                id: IdType;
                identifier: string;
                priority: number;
            }[];
        } | null>;
        find(filter?: Filter<E>): Promise<Array<E & EntityRelationType>>;
        findById(id: IdType, filter?: FilterExcludingWhere<E>): Promise<E & EntityRelationType>;
        findOne(filter?: Filter<E>): Promise<(E & EntityRelationType) | null>;
        count(where?: Where<E>): Promise<Count>;
    };
};
