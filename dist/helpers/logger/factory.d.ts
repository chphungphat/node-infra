import { Logger } from './application-logger';
export declare class LoggerFactory {
    static getLogger(scopes: string[], customLogger?: Logger): Logger;
}
