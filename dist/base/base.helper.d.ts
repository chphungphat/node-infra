import { ApplicationLogger } from '../helpers';
export declare class BaseHelper {
    protected identifier: string;
    protected logger: ApplicationLogger;
    constructor(opts: {
        scope: string;
        identifier: string;
    });
}
