import { BaseApplication } from '../../../base/applications';
import { Provider, ValueOrPromise } from '@loopback/core';
import { ICrashReportProvider, TCrashReportProviders } from '../common';
export type TGetCrashReportProviderFn = (opts: {
    identifier: TCrashReportProviders;
}) => ICrashReportProvider | null;
export declare class CrashReportProvider implements Provider<TGetCrashReportProviderFn> {
    private application;
    constructor(application: BaseApplication);
    value(): ValueOrPromise<TGetCrashReportProviderFn>;
}
