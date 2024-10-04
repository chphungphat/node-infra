"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = exports.migration = exports.cleanUpMigration = void 0;
const common_1 = require("../common");
const helpers_1 = require("../helpers");
const cleanUpMigration = (application, migrationProcesses) => __awaiter(void 0, void 0, void 0, function* () {
    helpers_1.applicationLogger.info('START | Clean up migrate database');
    for (const migrationProcess of migrationProcesses) {
        const { name, cleanFn } = migrationProcess;
        if (!cleanFn) {
            continue;
        }
        try {
            helpers_1.applicationLogger.info('[%s] DONE | Clean up migrate process', name);
            yield cleanFn(application);
            helpers_1.applicationLogger.info('[%s] DONE | Clean up migrate process', name);
        }
        catch (error) {
            helpers_1.applicationLogger.error('[%s] FAILED | Clean up migrate process | Error: %s', name, error);
        }
    }
});
exports.cleanUpMigration = cleanUpMigration;
const m = (application, migrationProcesses) => __awaiter(void 0, void 0, void 0, function* () {
    helpers_1.applicationLogger.info('[migration] START Migrating database');
    const migrationRepository = application.getSync('repositories.MigrationRepository');
    for (const migrationProcess of migrationProcesses) {
        const { name, fn, options } = migrationProcess;
        if (!name || !fn) {
            continue;
        }
        let migrated = null;
        let migrateStatus = common_1.MigrationStatuses.UNKNOWN;
        try {
            migrated = yield migrationRepository.findOne({ where: { name } });
            if (!(options === null || options === void 0 ? void 0 : options.alwaysRun) && migrated && migrated.status === common_1.MigrationStatuses.SUCCESS) {
                migrateStatus = migrated.status;
                helpers_1.applicationLogger.info('[migration] SKIP | Migrate process: %s | status: %s', name, migrateStatus);
                continue;
            }
            helpers_1.applicationLogger.info('[migration] START | Migrate process: %s', name);
            yield fn(application);
            migrateStatus = common_1.MigrationStatuses.SUCCESS;
            helpers_1.applicationLogger.info('[migration] DONE | Migrate process: %s', name);
        }
        catch (error) {
            migrateStatus = common_1.MigrationStatuses.FAIL;
            helpers_1.applicationLogger.error('[migration] FAILED | Migrate process: %s | Error: %s', name, error);
        }
        finally {
            if (migrated) {
                yield migrationRepository.updateById(migrated.id, {
                    status: migrateStatus,
                });
            }
            else {
                yield migrationRepository.create({ name, status: migrateStatus });
            }
        }
    }
    helpers_1.applicationLogger.info('[migration] DONE Migrating database');
});
exports.migration = m;
const migrate = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { scope, application, processes } = opts;
    helpers_1.applicationLogger.info('[%s] START | Migrating database', scope.toUpperCase());
    yield m(application, processes);
    helpers_1.applicationLogger.info('[%s] DONE | Migrating database', scope.toUpperCase());
});
exports.migrate = migrate;
//# sourceMappingURL=handler.js.map