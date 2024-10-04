"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcDataSource = exports.BaseGrpcDataSource = void 0;
const grpc_connector_1 = require("./grpc.connector");
const repository_1 = require("@loopback/repository");
const helpers_1 = require("../../../helpers");
// ------------------------------------------------------------------------------------
class BaseGrpcDataSource extends repository_1.juggler.DataSource {
    constructor(opts) {
        super(opts.connector, opts.settings);
        this.logger = helpers_1.LoggerFactory.getLogger([opts.scope]);
    }
}
exports.BaseGrpcDataSource = BaseGrpcDataSource;
// ------------------------------------------------------------------------------------
class GrpcDataSource extends BaseGrpcDataSource {
    constructor(opts) {
        const { dsConfig } = opts;
        const connector = new grpc_connector_1.GrpcConnector(Object.assign({}, dsConfig));
        super({ connector, scope: GrpcDataSource.name });
        this.connector = connector;
        this.init();
        this.logger.info('[Datasource] GRPC Datasource opts: %j', opts);
    }
    init() {
        this.connecting = true;
        this.connector
            .connect()
            .then(() => {
            this.connected = true;
            this.initialized = true;
        })
            .catch(error => {
            this.initialized = false;
            this.logger.error('[init] Failed to init datasource | Error: %s', error);
        })
            .finally(() => {
            this.connecting = false;
        });
    }
}
exports.GrpcDataSource = GrpcDataSource;
//# sourceMappingURL=grpc.datasource.js.map