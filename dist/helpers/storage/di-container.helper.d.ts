import { AnyObject } from '../../common';
export declare class DIContainerHelper<T extends object = AnyObject> {
    private static instance;
    private container;
    constructor();
    static getInstance<T extends object = AnyObject>(): DIContainerHelper<AnyObject>;
    static newInstance<T extends object = AnyObject>(): DIContainerHelper<T>;
    isBound(key: string): boolean;
    get<R>(key: keyof T): R;
    set<R>(key: string, value: R): void;
    keys(): string[];
    clear(): void;
    getContainer(): T;
}
