import { BaseTzEntity } from '../base';
import { IdType } from '../common/types';
import { MixinTarget } from '@loopback/core';
import { Entity, EntityResolver } from '@loopback/repository';
export declare const UserAuditMixin: <E extends MixinTarget<Entity>, C extends BaseTzEntity = BaseTzEntity, M extends BaseTzEntity = BaseTzEntity>(superClass: E, opts?: {
    useRelation: boolean;
    creatorResolver: EntityResolver<C>;
    creatorKeyTo?: string;
    modifierResolver: EntityResolver<M>;
    modifierKeyTo?: string;
}) => {
    new (...args: any[]): {
        createdBy: IdType;
        modifiedBy: IdType;
        getId: () => any;
        getIdObject: () => Object;
        toJSON: () => Object;
        toObject: (options?: import("@loopback/repository").Options) => Object;
    };
} & E;
