import { BaseDataSource } from '../../../base/base.datasource';
import { TzCrudRepository } from '../../../base/repositories';
import { Getter } from '@loopback/core';
import { OAuth2Client, OAuth2Scope, OAuth2Token } from '../models';
import { IdType } from '../../../common';
import { BelongsToAccessor } from '@loopback/repository';
export declare class OAuth2ClientRepository extends TzCrudRepository<OAuth2Client> {
    constructor(dataSource: BaseDataSource);
}
export declare class OAuth2ScopeRepository extends TzCrudRepository<OAuth2Scope> {
    constructor(dataSource: BaseDataSource);
}
export declare class OAuth2TokenRepository extends TzCrudRepository<OAuth2Token> {
    protected oauth2ClientRepository: Getter<OAuth2ClientRepository>;
    readonly client: BelongsToAccessor<OAuth2Client, IdType>;
    constructor(dataSource: BaseDataSource, oauth2ClientRepository: Getter<OAuth2ClientRepository>);
}
