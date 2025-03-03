import { ApplicationLogger } from '../../helpers';
import { Connector, JugglerDataSource } from '@loopback/repository';
import { IDataSourceOptions } from './types';
export declare class BaseDataSource<S extends IDataSourceOptions = IDataSourceOptions, C extends Connector = Connector> extends JugglerDataSource {
    protected logger: ApplicationLogger;
    constructor(opts: {
        scope: string;
        settings: S;
        connector?: C;
    });
}
