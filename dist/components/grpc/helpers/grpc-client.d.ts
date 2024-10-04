import { IGrpcClientOptions, TGrpcServiceClient } from '../common';
export declare class GrpcClient<S extends TGrpcServiceClient> {
    client: S;
    private logger;
    private identifier;
    private serviceClass;
    private address;
    private credentials;
    private onClientReady?;
    constructor(opts: IGrpcClientOptions<S>);
    static fromServiceClient<C extends TGrpcServiceClient>(opts: Omit<IGrpcClientOptions<C>, 'identifier'>): GrpcClient<C>;
    connect(): void;
    disconnect(): void;
}
export declare const initializeGrpcClient: <C extends TGrpcServiceClient>(opts: Omit<IGrpcClientOptions<C>, "identifier">) => GrpcClient<C>;
