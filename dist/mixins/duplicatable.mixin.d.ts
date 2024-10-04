import { BaseIdEntity } from '../base/base.model';
import { IdType } from '../common';
import { MixinTarget } from '@loopback/core';
export declare const DuplicatableMixin: <E extends MixinTarget<BaseIdEntity>>(superClass: E) => {
    new (...args: any[]): {
        sourceId?: IdType;
        id: number;
        getId: () => any;
        getIdObject: () => Object;
        toJSON: () => Object;
        toObject: (options?: import("@loopback/repository").Options) => Object;
    };
} & E;
