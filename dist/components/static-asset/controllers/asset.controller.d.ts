import { BaseApplication } from '../../../base/applications';
import { IController } from '../../../common';
import { ApplicationLogger } from '../../../helpers';
import { Request, Response } from '@loopback/rest';
export declare class StaticAssetController implements IController {
    protected application: BaseApplication;
    private response;
    protected logger: ApplicationLogger;
    private temporaryStorage;
    constructor(application: BaseApplication, response: Response);
    createBucket(bucketName: string): Promise<import("minio").BucketItemFromList | null | undefined>;
    removeBucket(bucketName: string): Promise<boolean>;
    getBucket(bucketName: string): Promise<import("minio").BucketItemFromList | null | undefined>;
    getBuckets(): Promise<import("minio").BucketItemFromList[]>;
    uploadObject(request: Request, bucketName: string, folderPath?: string): Promise<unknown>;
    downloadObject(bucketName: string, objectName: string): Promise<unknown>;
    getStaticObject(bucketName: string, objectName: string): Promise<unknown>;
    /**
     * This method fetches the whole file from minio and streams it to the client.
     * It's meant to be used for using file caching on browser.
     * For other use cases, use `getStaticObject` instead.
     *
     * NOTE: By the time this method was written, Google Chrome cannot cache content
     * if the response status code is 206 (Partial Content). So, we use 200 instead.
     */
    fetchWholeFile(bucketName: string, objectName: string, cacheTime?: number): Promise<void>;
    deleteObjects(bucketName: string, payload: {
        objectNames: string[];
    }, folderPath?: string): Promise<void>;
}
