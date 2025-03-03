import winston from 'winston';
import 'winston-daily-rotate-file';
import { IDgramTransportOptions } from './transports';
export declare const defineCustomLoggerFormatter: (opts: {
    label: string;
}) => ReturnType<typeof winston.format.combine>;
export declare const applicationLogFormatter: winston.Logform.Format;
export declare const defineCustomLogger: (opts: {
    logLevels?: {
        [name: string | symbol]: number;
    };
    logColors?: {
        [name: string | symbol]: string;
    };
    loggerFormatter?: ReturnType<typeof winston.format.combine>;
    transports: {
        info: {
            file?: {
                prefix: string;
                folder: string;
            };
            dgram?: Partial<IDgramTransportOptions>;
        };
        error: {
            file: {
                prefix: string;
                folder: string;
            };
            dgram?: Partial<IDgramTransportOptions>;
        };
    };
}) => winston.Logger;
export declare const applicationLogger: winston.Logger;
