import { BaseApplication } from '../../../base/applications';
export declare const createViewPolicy: (opts: {
    datasourceKey: string;
}) => {
    name: string;
    fn: (application: BaseApplication) => Promise<void>;
};
