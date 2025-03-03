import { IdType } from '../common/types';
import { MixinTarget } from '@loopback/core';
import { Entity } from '@loopback/repository';
/**
 * @deprecated The method will soon deleted
 */
export declare const UserAuditMixinDeprecated: <E extends MixinTarget<Entity>>(superClass: E) => {
    new (...args: any[]): {
        createdBy: IdType;
        modifiedBy: IdType;
        getId: () => any;
        getIdObject: () => Object;
        toJSON: () => Object;
        toObject: (options?: import("@loopback/repository").Options) => Object;
    };
} & E;
