import { BaseService } from '../../../base/services';
import { TGetTokenExpiresFn, IJWTTokenPayload } from '../common';
export declare class JWTTokenService extends BaseService {
    protected applicationSecret: string;
    protected jwtSecret: string;
    protected jwtExpiresIn: string;
    protected getTokenExpiresFn: TGetTokenExpiresFn;
    private aes;
    constructor(applicationSecret: string, jwtSecret: string, jwtExpiresIn: string, getTokenExpiresFn: TGetTokenExpiresFn);
    extractCredentials(request: {
        headers: any;
    }): {
        type: string;
        token: string;
    };
    encryptPayload(payload: IJWTTokenPayload): {
        [x: string]: string;
    };
    decryptPayload(decodedToken: any): IJWTTokenPayload;
    verify(opts: {
        type: string;
        token: string;
    }): IJWTTokenPayload;
    generate(opts: {
        payload: IJWTTokenPayload;
        getTokenExpiresFn?: TGetTokenExpiresFn;
    }): Promise<string>;
}
