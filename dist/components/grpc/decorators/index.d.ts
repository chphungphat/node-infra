import { IGrpcControllerOptions, IGrpcMethodOptions } from '../common';
export declare const grpcController: (opts?: IGrpcControllerOptions) => ClassDecorator;
export declare const grpcMethod: (opts: IGrpcMethodOptions) => MethodDecorator;
