import { GrpcConnector, IGrpcConnectorOptions } from './grpc.connector';
import { Connector, juggler, Options } from '@loopback/repository';
import { ApplicationLogger } from '../../../helpers';
import { ValueOrPromise } from '@loopback/core';
import { TGrpcServiceClient } from '../common';
export declare abstract class BaseGrpcDataSource<S extends TGrpcServiceClient> extends juggler.DataSource {
    protected logger: ApplicationLogger;
    connector: GrpcConnector<S>;
    constructor(opts: {
        connector: Connector;
        settings?: Options;
        scope: string;
    });
    abstract init(): ValueOrPromise<void>;
}
export declare class GrpcDataSource<S extends TGrpcServiceClient> extends BaseGrpcDataSource<S> {
    constructor(opts: {
        dsConfig: IGrpcConnectorOptions<S>;
    });
    init(): ValueOrPromise<void>;
}
