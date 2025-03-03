import dgram from 'dgram';
import Transport from 'winston-transport';
export interface IDgramTransportOptions extends Transport.TransportStreamOptions {
    label: string;
    host: string;
    port: number;
    levels: Array<string>;
    socketOptions: dgram.SocketOptions;
}
export declare class DgramTransport extends Transport {
    private label;
    private host;
    private port;
    private triggerLevels;
    private socketOptions;
    private client;
    constructor(opts: IDgramTransportOptions);
    static fromPartial(opts?: Partial<IDgramTransportOptions>): DgramTransport | null;
    private establish;
    private formatMessage;
    log(opts: {
        level: string;
        message: string;
        label?: string;
        timestamp?: string;
        [extra: symbol]: any;
    }, callback: Function): void;
}
