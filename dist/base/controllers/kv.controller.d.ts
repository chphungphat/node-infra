import { CrudRestControllerOptions } from '@loopback/rest-crud';
import { BaseKVEntity } from '../base.model';
import { AbstractKVRepository } from '../repositories';
export interface IKVControllerOptions<E extends BaseKVEntity> {
    entity: typeof BaseKVEntity & {
        prototype: E;
    };
    repository: {
        name: string;
    };
    controller: CrudRestControllerOptions;
}
export declare const defineKVController: <E extends BaseKVEntity>(opts: IKVControllerOptions<E>) => {
    new (repository: AbstractKVRepository<E>): {
        repository: AbstractKVRepository<E>;
        defaultLimit: number;
        get(key: string): Promise<E>;
        getKeys(match: string): AsyncIterable<string>;
    };
};
