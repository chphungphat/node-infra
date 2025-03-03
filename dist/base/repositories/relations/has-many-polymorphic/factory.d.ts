import { BaseEntity } from '../../../../base/base.model';
import { IdType } from '../../../../common';
import { Getter } from '@loopback/core';
import { DefaultHasManyRepository, Entity, EntityCrudRepository, HasManyRepositoryFactory, InclusionResolver } from '@loopback/repository';
import { IHasManyPolymorphicDefinition, TPolymorphic } from './types';
/**
 * @experimental
 */
export declare const createHasManyPolymorphicInclusionResolver: <Target extends BaseEntity, TargetId extends IdType, TargetRelations extends object>(opts: {
    principalType: string;
    relationMetadata: IHasManyPolymorphicDefinition;
    targetRepositoryGetter: Getter<EntityCrudRepository<Target, TargetId, TargetRelations>>;
}) => InclusionResolver<Entity, Target>;
/**
 * @experimental
 */
export declare const createHasManyPolymorphicRepositoryFactoryFor: <Target extends BaseEntity, TargetId extends IdType, SourceId extends IdType>(opts: {
    principalType: string;
    relationMetadata: IHasManyPolymorphicDefinition;
    targetRepositoryGetter: Getter<EntityCrudRepository<Target, TargetId>>;
}) => HasManyRepositoryFactory<Target, SourceId>;
/**
 * @experimental
 */
export declare class DefaultHasManyPolymorphicRepository<Target extends BaseEntity, TargetId extends IdType, TargetRepository extends EntityCrudRepository<Target, TargetId>, SourceId> extends DefaultHasManyRepository<Target, TargetId, TargetRepository> {
    constructor(opts: {
        targetRepositoryGetter: Getter<TargetRepository>;
        polymorphic: TPolymorphic & {
            typeValue: string;
            idValue: SourceId;
        };
    });
}
