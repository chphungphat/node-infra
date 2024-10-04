import { TInjectionGetter } from '../../../common';
import * as grpc from '@grpc/grpc-js';
export declare class GrpcServer extends grpc.Server {
    private identifier;
    private logger;
    private address;
    private credentials;
    private injectionGetter;
    constructor(opts: {
        identifier: string;
        address: string | number;
        credentials: grpc.ServerCredentials;
        options?: grpc.ServerOptions;
        injectionGetter: TInjectionGetter;
    });
    start(): void;
    private setupHandler;
    private loadService;
    private bindingService;
    private bindingServices;
}
