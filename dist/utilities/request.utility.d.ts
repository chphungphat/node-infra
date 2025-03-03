import { IRequestedRemark } from '../common';
import { Request, Response } from '@loopback/rest';
import multer from 'multer';
export declare const parseMultipartBody: (opts: {
    storage?: multer.StorageEngine;
    request: Request;
    response: Response;
}) => Promise<any>;
export declare const getSchemaObject: <T extends object>(ctor?: Function & {
    prototype: T;
}) => import("@loopback/rest").SchemaObject;
export declare const getRequestId: (opts: {
    request: Request;
}) => undefined;
export declare const getRequestIp: (opts: {
    request: Request;
}) => string;
export declare const getRequestRemark: (opts: {
    request: Request;
}) => IRequestedRemark | undefined;
