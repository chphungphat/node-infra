import { BaseHelper } from '../../base/base.helper';
import { Client, ClientOptions } from 'minio';
import { Readable } from 'stream';
export interface IUploadFile {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
    encoding: string;
    [key: string | symbol]: any;
}
export declare class MinioHelper extends BaseHelper {
    client: Client;
    constructor(options: ClientOptions);
    isBucketExists(opts: {
        name: string;
    }): Promise<boolean>;
    getBuckets(): Promise<import("minio").BucketItemFromList[]>;
    getBucket(opts: {
        name: string;
    }): Promise<import("minio").BucketItemFromList | null | undefined>;
    createBucket(opts: {
        name: string;
    }): Promise<import("minio").BucketItemFromList | null | undefined>;
    removeBucket(opts: {
        name: string;
    }): Promise<boolean>;
    getFileType(opts: {
        mimeType: string;
    }): "text" | "image" | "video" | "unknown";
    upload(opts: {
        bucket: string;
        files: Array<IUploadFile>;
    }): Promise<unknown[]>;
    getFile(opts: {
        bucket: string;
        name: string;
        options?: {
            versionId?: string;
            SSECustomerAlgorithm?: string;
            SSECustomerKey?: string;
            SSECustomerKeyMD5?: string;
        };
    }): Promise<Readable>;
    getStat(opts: {
        bucket: string;
        name: string;
    }): Promise<import("minio").BucketItemStat>;
    removeObject(opts: {
        bucket: string;
        name: string;
    }): Promise<void>;
    removeObjects(opts: {
        bucket: string;
        names: Array<string>;
    }): Promise<void>;
    getListObjects(opts: {
        bucket: string;
        prefix?: string;
        useRecursive?: boolean;
    }): import("minio").BucketStream<import("minio/dist/main/internal/type.js").ObjectInfo>;
}
