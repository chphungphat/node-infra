import { BaseTzEntity } from '../base';
import { AnyType, EntityClassType } from '../common';
export declare const getTableDefinition: <T extends BaseTzEntity>(opts: {
    model: EntityClassType<T>;
    alias?: string;
}) => {
    table: {
        name: string;
        alias: string;
        nameWithQuotation: string;
    };
    tableWithAlias: string;
    columns: { [key in keyof T]: string; };
    columnsNoAlias: { [key in keyof T]: string; };
};
export declare const getValue: (value: AnyType) => any;
export declare const buildBatchUpdateQuery: <E>(opts: {
    tableName: string;
    keys: (keyof E)[];
    data: AnyType[];
    setKeys: (keyof E | {
        sourceKey: keyof E;
        targetKey: keyof E;
    })[];
    whereKeys: (keyof E | {
        sourceKey: keyof E;
        targetKey: keyof E;
    })[];
    whereRaws?: string[];
}) => string;
