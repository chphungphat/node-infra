import { format } from 'winston';
import 'winston-daily-rotate-file';
export declare const applicationLogFormatter: ReturnType<typeof format.combine>;
export declare const applicationLogger: import("winston").Logger;
