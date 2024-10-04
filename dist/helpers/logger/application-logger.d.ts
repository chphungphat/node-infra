declare class Logger {
    private scopes;
    readonly _environment: string | undefined;
    constructor();
    withScope(scope: string): this;
    private _enhanceMessage;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}
export declare class ApplicationLogger extends Logger {
}
export {};
