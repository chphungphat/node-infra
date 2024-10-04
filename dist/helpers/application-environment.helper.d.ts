import { IApplicationEnvironment } from '../common';
export declare class ApplicationEnvironment implements IApplicationEnvironment {
    private prefix;
    private arguments;
    constructor(opts: {
        prefix: string;
        envs: Record<string, string | number | undefined>;
    });
    get<ReturnType>(key: string): ReturnType;
    set<ValueType>(key: string, value: ValueType): void;
    keys(): string[];
}
export declare const applicationEnvironment: ApplicationEnvironment;
