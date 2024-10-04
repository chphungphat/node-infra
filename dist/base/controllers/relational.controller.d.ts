import { ControllerClass } from '@loopback/core';
import { SchemaObject } from '@loopback/rest';
import { NullableType, TRelationType } from '../../common/types';
import { Class } from '@loopback/service-proxy';
import { BaseTzEntity } from './..';
import { BaseController } from './common';
export interface IRelationCrudControllerOptions {
    association: {
        source: string;
        relationName: string;
        relationType: TRelationType;
        target: string;
    };
    schema: {
        source?: SchemaObject;
        relation?: SchemaObject;
        target: SchemaObject;
    };
    options?: {
        useControlTarget: boolean;
        defaultLimit?: number;
        endPoint?: string;
    };
}
export declare const defineRelationViewController: <S extends BaseTzEntity, T extends BaseTzEntity>(opts: {
    baseClass?: Class<BaseController>;
    relationType: TRelationType;
    relationName: string;
    defaultLimit?: number;
    endPoint?: string;
    schema?: SchemaObject;
}) => ControllerClass;
export declare const defineAssociateController: <S extends BaseTzEntity, T extends BaseTzEntity, R extends BaseTzEntity | NullableType>(opts: {
    baseClass?: Class<BaseController>;
    relationName: string;
    defaultLimit?: number;
    endPoint?: string;
    schema?: SchemaObject;
}) => ControllerClass;
export declare const defineRelationCrudController: <S extends BaseTzEntity, T extends BaseTzEntity, R extends BaseTzEntity | NullableType>(controllerOptions: IRelationCrudControllerOptions) => ControllerClass;
