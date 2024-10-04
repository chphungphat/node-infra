import { ApplicationLogger } from '../../../helpers';
import { IGrpcController } from '../common';
declare abstract class AbstractGrpcController implements IGrpcController {
    protected logger: ApplicationLogger;
    constructor(opts: {
        scope: string;
    });
}
export declare class BaseGrpcController extends AbstractGrpcController {
    constructor(opts: {
        scope: string;
    });
}
export {};
