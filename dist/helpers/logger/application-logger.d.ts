import winston from 'winston';
import { TLogLevel } from './common';
export declare class Logger {
    private readonly environment;
    private scopes;
    private customLogger?;
    constructor(opts?: {
        customLogger?: winston.Logger;
    });
    private getLogger;
    private _enhanceMessage;
    withScope(scope: string): this;
    log(level: TLogLevel, message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    emerg(message: string, ...args: any[]): void;
}
export declare class ApplicationLogger extends Logger {
}
