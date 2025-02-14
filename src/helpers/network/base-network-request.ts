import { getError } from '@/utilities';
import { AxiosRequestConfig } from 'axios';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { NetworkHelper } from './network.helper';
import { BaseHelper } from '@/base/base.helper';

export abstract class BaseNetworkRequest extends BaseHelper {
  protected baseUrl: string;
  protected networkService: NetworkHelper;

  constructor(opts: { name: string; scope: string; networkOptions: AxiosRequestConfig }) {
    super({ scope: opts.name, identifier: opts.name });

    const { name, networkOptions } = opts;
    const { headers = {}, ...rest } = networkOptions;

    const requestConfigs = {
      ...rest,
      withCredentials: true,
      timeout: 60 * 1000,
      validateStatus: (status: number) => {
        return status < 500;
      },
      headers,
    };

    const defaultHeader = get(requestConfigs, "headers['Content-Type']");
    if (!defaultHeader) {
      requestConfigs.headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    this.baseUrl = networkOptions?.baseURL ?? '';
    this.networkService = new NetworkHelper({ name, requestConfigs });
  }

  getRequestPath(opts: { paths: Array<string> }) {
    const paths = opts?.paths ?? [];

    const rs = paths
      .map((path: string) => {
        if (!path.startsWith('/')) {
          path = `/${path}`; // Add / to the start of url path
        }

        return path;
      })
      .join('');

    return rs;
  }

  getRequestUrl(opts: { baseUrl?: string; paths: Array<string> }) {
    let baseUrl = opts?.baseUrl ?? this.baseUrl ?? '';
    const paths = opts?.paths ?? [];

    if (!baseUrl || isEmpty(baseUrl)) {
      throw getError({
        statusCode: 500,
        message: '[getRequestUrl] Invalid configuration for third party request base url!',
      });
    }

    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1); // Remove / at the end
    }

    const joined = this.getRequestPath({ paths });
    return `${baseUrl ?? this.baseUrl}${joined}`;
  }

  getNetworkService() {
    return this.networkService;
  }
}
