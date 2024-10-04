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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApplication = void 0;
const common_1 = require("../../common");
const components_1 = require("../../components");
const common_2 = require("../../components/authenticate/common");
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const utilities_1 = require("../../utilities");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_crud_1 = require("@loopback/rest-crud");
const service_proxy_1 = require("@loopback/service-proxy");
const base_sequence_1 = require("../base.sequence");
const get_1 = __importDefault(require("lodash/get"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const { NODE_ENV, RUN_MODE, ALLOW_EMPTY_ENV_VALUE = false, APPLICATION_ENV_PREFIX = 'APP_ENV', APP_ENV_APPLICATION_NAME = 'PNT', APP_ENV_APPLICATION_TIMEZONE = 'Asia/Ho_Chi_Minh', APP_ENV_DS_MIGRATION = 'postgres', APP_ENV_DS_AUTHORIZE = 'postgres', APP_ENV_LOGGER_FOLDER_PATH = './', } = process.env;
class BaseApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(opts) {
        var _a;
        const { serverOptions, sequence } = opts;
        super(serverOptions);
        this.logger = helpers_1.LoggerFactory.getLogger(['Application']);
        this.bind(common_2.AuthenticateKeys.ALWAYS_ALLOW_PATHS).to([]);
        this.bind(common_1.BindingKeys.APPLICATION_MIDDLEWARE_OPTIONS).to(rest_1.MiddlewareSequence.defaultOptions);
        this.sequence(sequence !== null && sequence !== void 0 ? sequence : base_sequence_1.BaseApplicationSequence);
        this.staticConfigure();
        this.projectRoot = this.getProjectRoot();
        this.component(rest_crud_1.CrudRestComponent);
        this.logger.info('------------------------------------------------------------------------');
        this.logger.info(' Starting application... | Name: %s | Env: %s', APP_ENV_APPLICATION_NAME, NODE_ENV);
        this.logger.info(' AllowEmptyEnv: %s | Prefix: %s', ALLOW_EMPTY_ENV_VALUE, APPLICATION_ENV_PREFIX);
        this.logger.info(' RunMode: %s', RUN_MODE);
        this.logger.info(' Timezone: %s', APP_ENV_APPLICATION_TIMEZONE);
        this.logger.info(' LogPath: %s', APP_ENV_LOGGER_FOLDER_PATH);
        this.logger.info(' Datasource | Migration: %s | Authorize: %s', APP_ENV_DS_MIGRATION, APP_ENV_DS_AUTHORIZE);
        this.logger.info('------------------------------------------------------------------------');
        // Validate whole application environment args.
        this.logger.info('[environments] Validating application environments...');
        const envValidation = this.validateEnv();
        if (!envValidation.result) {
            throw (0, utilities_1.getError)({ message: (_a = envValidation === null || envValidation === void 0 ? void 0 : envValidation.message) !== null && _a !== void 0 ? _a : 'Invalid application environment!' });
        }
        else {
            this.logger.info('[environments] All application environments are valid...');
        }
        this.logger.info('[models] Declare application models...');
        this.models = new Set([]);
        this.models = this.declareModels();
        // Middlewares
        this.logger.info('[middlewares] Declare application middlewares...');
        this.middleware(middlewares_1.RequestBodyParserMiddleware);
        this.middleware(middlewares_1.RequestSpyMiddleware);
        // Do configure while modules for application.
        this.logger.info('[preConfigure] Executing Pre-Configuration...');
        this.preConfigure();
        this.logger.info('[postConfigure] Executing Post-Configuration...');
        this.postConfigure();
    }
    getServerHost() {
        return helpers_1.applicationEnvironment.get(common_1.EnvironmentKeys.APP_ENV_SERVER_HOST);
    }
    getServerPort() {
        return (0, utilities_1.int)(helpers_1.applicationEnvironment.get(common_1.EnvironmentKeys.APP_ENV_SERVER_PORT));
    }
    getServerAddress() {
        return `${this.getServerHost()}:${this.getServerPort()}`;
    }
    getMigrateModels(opts) {
        const { ignoreModels, migrateModels } = opts;
        const repoBindings = this.findByTag(repository_1.RepositoryTags.REPOSITORY);
        const valids = repoBindings.filter(b => {
            const key = b.key;
            const modelName = key.slice(key.indexOf('.') + 1, key.indexOf('Repository'));
            if (ignoreModels === null || ignoreModels === void 0 ? void 0 : ignoreModels.includes(modelName)) {
                return false;
            }
            if (migrateModels && !migrateModels.includes(modelName)) {
                return false;
            }
            return true;
        });
        // Load models
        return Promise.all(valids.map(b => this.get(b.key)));
    }
    classifyModelsByDs(opts) {
        const { reps } = opts;
        const modelByDs = {};
        for (const rep of reps) {
            const dsName = (0, get_1.default)(rep, 'dataSource.name');
            if (!dsName || (0, isEmpty_1.default)(dsName)) {
                continue;
            }
            const dsKey = `datasources.${dsName}`;
            if (!(modelByDs === null || modelByDs === void 0 ? void 0 : modelByDs[dsKey])) {
                modelByDs[dsKey] = [];
            }
            const modelName = (0, get_1.default)(rep, 'entityClass.definition.name', '');
            if ((0, isEmpty_1.default)(modelName)) {
                continue;
            }
            modelByDs[dsKey].push(modelName);
        }
        return modelByDs;
    }
    migrateModels(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { existingSchema, ignoreModels = [], migrateModels } = opts;
            this.logger.info('[migrateModels] Loading legacy migratable models...!');
            const reps = (yield this.getMigrateModels({
                ignoreModels,
                migrateModels,
            }));
            const classified = this.classifyModelsByDs({ reps });
            const operation = existingSchema === 'drop' ? 'automigrate' : 'autoupdate';
            const dsBindings = this.findByTag(repository_1.RepositoryTags.DATASOURCE);
            for (const b of dsBindings) {
                const t = new Date().getTime();
                this.logger.info('[migrateModels] START | Migrating datasource %s', b.key);
                const ds = yield this.get(b.key);
                if (!ds) {
                    this.logger.error('[migrateModels] Invalid datasource with key %s', b.key);
                    continue;
                }
                const isDisableMigration = (_b = (_a = ds.settings) === null || _a === void 0 ? void 0 : _a.disableMigration) !== null && _b !== void 0 ? _b : false;
                if (!(operation in ds) || isDisableMigration) {
                    this.logger.info('[migrateModels] Skip migrating datasource %s', b.key);
                    continue;
                }
                yield ds[operation](classified === null || classified === void 0 ? void 0 : classified[b.key]);
                this.logger.info('[migrateModels] DONE | Migrating datasource %s | Took: %d(ms)', b.key, new Date().getTime() - t);
            }
        });
    }
    grpcController(ctor, nameOrOptions) {
        return this.controller(ctor, nameOrOptions).tag(components_1.GrpcTags.CONTROLLERS).inScope(core_1.BindingScope.SINGLETON);
    }
}
exports.BaseApplication = BaseApplication;
//# sourceMappingURL=base.application.js.map