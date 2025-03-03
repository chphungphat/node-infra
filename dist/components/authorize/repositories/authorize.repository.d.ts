import { BaseTzEntity } from '../../../base/base.model';
import { BaseDataSource } from '../../../base/datasources';
import { TzCrudRepository, ViewRepository } from '../../../base/repositories';
import { EntityClassType, IdType } from '../../../common';
import { Getter } from '@loopback/core';
import { HasManyThroughRepositoryFactory } from '@loopback/repository';
import { Permission, PermissionMapping, Role, UserRole, ViewAuthorizePolicy } from '../models';
export declare abstract class AbstractAuthorizeRepository<T extends BaseTzEntity> extends TzCrudRepository<T> {
    constructor(entityClass: EntityClassType<T>, dataSource: BaseDataSource);
    abstract bindingRelations(): void;
}
export declare class RoleRepository extends AbstractAuthorizeRepository<Role> {
    protected permissionRepositoryGetter: Getter<PermissionRepository>;
    protected permissionMappingRepositoryGetter: Getter<PermissionMappingRepository>;
    readonly permissions: HasManyThroughRepositoryFactory<Permission, IdType, PermissionMapping, IdType>;
    constructor(dataSource: BaseDataSource, permissionRepositoryGetter: Getter<PermissionRepository>, permissionMappingRepositoryGetter: Getter<PermissionMappingRepository>);
    bindingRelations(): void;
}
export declare class PermissionRepository extends AbstractAuthorizeRepository<Permission> {
    constructor(dataSource: BaseDataSource);
    bindingRelations(): void;
}
export declare class PermissionMappingRepository extends AbstractAuthorizeRepository<PermissionMapping> {
    constructor(dataSource: BaseDataSource);
    bindingRelations(): void;
}
export declare class UserRoleRepository extends AbstractAuthorizeRepository<UserRole> {
    constructor(dataSource: BaseDataSource);
    bindingRelations(): void;
}
export declare class ViewAuthorizePolicyRepository extends ViewRepository<ViewAuthorizePolicy> {
    constructor(dataSource: BaseDataSource);
}
