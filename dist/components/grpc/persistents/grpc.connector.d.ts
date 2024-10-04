import { ApplicationLogger } from '../../../helpers';
import { ChannelCredentials } from '@grpc/grpc-js';
import { Constructor } from '@loopback/core';
import { Connector } from '@loopback/repository';
import { TGrpcServiceClient } from '../common';
import { GrpcClient } from '../helpers';
export interface IGrpcConnectorOptions<S extends TGrpcServiceClient> {
    host: string;
    port: string | number;
    credentials: ChannelCredentials;
    serviceClassResolver: () => Constructor<S>;
}
export declare class GrpcConnector<S extends TGrpcServiceClient> implements Connector {
    name: string;
    host: string;
    port: string | number;
    credentials: ChannelCredentials;
    serviceClassResolver: () => Constructor<S>;
    protected logger: ApplicationLogger;
    grpcClient: GrpcClient<S>;
    constructor(opts: IGrpcConnectorOptions<S>);
    binding(): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    ping(): Promise<void>;
    execute<R>(method: string, parameters: any[]): Promise<R>;
}
