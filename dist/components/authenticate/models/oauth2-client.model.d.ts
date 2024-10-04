import { BaseTzEntity } from '../../../base/base.model';
import { NumberIdType } from '../../../common';
export declare class OAuth2Client extends BaseTzEntity {
    identifier: string;
    clientId: string;
    name: string;
    description: string;
    clientSecret: string;
    grants: Array<string>;
    endpoints: {
        rootUrl: string;
        homeUrl: string;
        redirectUrls: Array<string>;
        callbackUrls: Array<string>;
        originUrls: Array<string>;
    };
    userId?: NumberIdType;
    constructor(data?: Partial<OAuth2Client>);
}
