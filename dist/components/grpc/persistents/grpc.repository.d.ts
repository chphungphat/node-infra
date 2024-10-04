import { IRepository } from '../../../common';
import { ApplicationLogger } from '../../../helpers';
import { BaseGrpcDataSource } from './grpc.datasource';
import { TGrpcServiceClient } from '../common';
export declare class GrpcRepository<S extends TGrpcServiceClient> implements IRepository {
    protected logger: ApplicationLogger;
    private dataSource;
    constructor(opts: {
        dataSource: BaseGrpcDataSource<S>;
        scope: string;
    });
    getServiceClient(): S;
}
