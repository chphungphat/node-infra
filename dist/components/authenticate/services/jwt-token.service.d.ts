import { BaseService } from '../../../base/base.service';
import { IJWTTokenPayload } from '../common';
export declare class JWTTokenService extends BaseService {
    private applicationSecret;
    private jwtSecret;
    private jwtExpiresIn;
    private aes;
    constructor(applicationSecret: string, jwtSecret: string, jwtExpiresIn: string);
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
    generate(payload: IJWTTokenPayload): string;
}
