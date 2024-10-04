import { BaseHelper } from '../../base/base.helper';
import knex from 'knex';
type TQueryBuilderClientType = 'pg' | 'mysql';
export declare class QueryBuilderHelper extends BaseHelper {
    private static instance;
    clients: Map<TQueryBuilderClientType, knex.Knex>;
    constructor(opts: {
        clientType: TQueryBuilderClientType;
    });
    static getInstance(opts: {
        clientType: TQueryBuilderClientType;
    }): QueryBuilderHelper;
    getQueryBuilder(opts: {
        clientType: TQueryBuilderClientType;
    }): knex.Knex.QueryBuilder<any, any[]>;
    getUpdateBuilder(opts: {
        clientType: TQueryBuilderClientType;
        tableName: string;
        schema: string;
    }): knex.Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    static getPostgresQueryBuilder(): knex.Knex.QueryBuilder<any, any[]>;
    static getPostgresUpdateBuilder(opts: {
        tableName: string;
        schema?: string;
    }): knex.Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    static getMySQLQueryBuilder(): knex.Knex.QueryBuilder<any, any[]>;
}
export {};
