import { BaseProvider } from '../base/base.provider';
import { Provider, ValueOrPromise } from '@loopback/core';
import { Middleware, MiddlewareContext } from '@loopback/rest';
export declare class RequestSpyMiddleware extends BaseProvider implements Provider<Middleware> {
    constructor();
    handle(context: MiddlewareContext): void;
    value(): ValueOrPromise<Middleware>;
}
