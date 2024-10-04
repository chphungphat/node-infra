import { BaseApplication } from '../base/applications';
import { TMigrationProcess } from '../components/migration';
export declare const cleanUpMigration: (application: BaseApplication, migrationProcesses: Array<TMigrationProcess>) => Promise<void>;
export declare const migration: (application: BaseApplication, migrationProcesses: Array<TMigrationProcess>) => Promise<void>;
export declare const migrate: (opts: {
    scope: "up" | "down";
    application: BaseApplication;
    processes: Array<TMigrationProcess>;
}) => Promise<void>;
