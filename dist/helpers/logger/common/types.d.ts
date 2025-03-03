import { TStatusFromClass } from '../../../common/types';
export declare class LogLevels {
    static readonly ERROR = "error";
    static readonly ALERT = "alert";
    static readonly EMERG = "emerg";
    static readonly WARN = "warn";
    static readonly INFO = "info";
    static readonly HTTP = "http";
    static readonly VERBOSE = "verbose";
    static readonly DEBUG = "debug";
    static readonly SILLY = "silly";
    static readonly SCHEME_SET: Set<string>;
    static isValid(input: string): boolean;
}
export type TLogLevel = TStatusFromClass<typeof LogLevels>;
