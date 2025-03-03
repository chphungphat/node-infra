import { BaseService } from '../../../base/services';
export declare class BasicTokenService extends BaseService {
    constructor();
    verify(credential: {
        username: string;
        password: string;
    }): Promise<any>;
}
