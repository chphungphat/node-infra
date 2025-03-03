import { ControllerClass } from '@loopback/core';
import { SchemaObject } from '@loopback/rest';
import { NullableType, TRelationType } from '../../common/types';
import { Class } from '@loopback/service-proxy';
import { BaseTzEntity } from './..';
import { BaseController } from './common';
export interface IRelationCrudControllerOptions {
    association: {
        entities: {
            source: string;
            target: string;
        };
        repositories?: {
            source: string;
            target: string;
        };
        relation: {
            name: string;
            type: TRelationType;
        };
    };
    schema: {
        source?: SchemaObject;
        relation?: SchemaObject;
        target: SchemaObject;
    };
    options?: {
        useControlTarget: boolean;
        doInjectCurrentUser?: boolean;
        defaultLimit?: number;
        endPoint?: string;
    };
}
export declare const defineRelationViewController: <S extends BaseTzEntity, // Source Entity Type
T extends BaseTzEntity, // Target Entity Type
TE extends BaseTzEntity = any>(opts: {
    baseClass?: Class<BaseController>;
    entities: {
        source: string;
        target: string;
    };
    relation: {
        name: string;
        type: TRelationType;
    };
    defaultLimit?: number;
    endPoint?: string;
    schema?: SchemaObject;
}) => ControllerClass;
export declare const defineAssociateController: <S extends BaseTzEntity, T extends BaseTzEntity, R extends BaseTzEntity | NullableType>(opts: {
    baseClass: ReturnType<typeof defineRelationViewController>;
    relation: {
        name: string;
        type: TRelationType;
    };
    defaultLimit?: number;
    endPoint?: string;
    schema?: SchemaObject;
}) => ControllerClass;
export declare const defineRelationCrudController: <S extends BaseTzEntity, T extends BaseTzEntity, R extends BaseTzEntity | NullableType>(controllerOptions: IRelationCrudControllerOptions) => ControllerClass;
