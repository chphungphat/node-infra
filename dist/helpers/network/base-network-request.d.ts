import { AxiosRequestConfig } from 'axios';
import { NetworkHelper } from './network.helper';
import { BaseHelper } from '../../base/base.helper';
export declare abstract class BaseNetworkRequest extends BaseHelper {
    protected baseUrl: string;
    protected networkService: NetworkHelper;
    constructor(opts: {
        name: string;
        scope: string;
        networkOptions: AxiosRequestConfig;
    });
    getRequestUrl(opts: {
        baseUrl?: string;
        paths: Array<string>;
    }): string;
    getNetworkService(): NetworkHelper;
}
