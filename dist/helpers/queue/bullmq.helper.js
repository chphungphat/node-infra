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
exports.BullMQHelper = void 0;
const bullmq_1 = require("bullmq");
const base_helper_1 = require("../../base/base.helper");
class BullMQHelper extends base_helper_1.BaseHelper {
    constructor(options) {
        super({ scope: BullMQHelper.name, identifier: options.identifier });
        this.numberOfWorker = 1;
        const { queueName, connection, role, numberOfWorker = 1, onWorkerData, onWorkerDataCompleted, onWorkerDataFail, } = options;
        this.queueName = queueName;
        this.role = role;
        this.connection = connection;
        this.numberOfWorker = numberOfWorker;
        this.onWorkerData = onWorkerData;
        this.onWorkerDataCompleted = onWorkerDataCompleted;
        this.onWorkerDataFail = onWorkerDataFail;
        this.configure();
    }
    static newInstance(opts) {
        return new BullMQHelper(opts);
    }
    configureQueue() {
        if (!this.queueName) {
            this.logger.error('[configureQueue][%s] Invalid queue name', this.identifier);
            return;
        }
        this.queue = new bullmq_1.Queue(this.queueName, {
            connection: this.connection,
            defaultJobOptions: {
                removeOnComplete: true,
                removeOnFail: true,
            },
        });
    }
    configureWorker() {
        if (!this.queueName) {
            this.logger.error('[configureWorkers][%s] Invalid worker name', this.identifier);
            return;
        }
        this.worker = new bullmq_1.Worker(this.queueName, (job) => __awaiter(this, void 0, void 0, function* () {
            if (this.onWorkerData) {
                const rs = yield this.onWorkerData(job);
                return rs;
            }
            const { id, name, data } = job;
            this.logger.info('[onWorkerData][%s] queue: %s | id: %s | name: %s | data: %j', this.identifier, this.queueName, id, name, data);
        }), { connection: this.connection, concurrency: this.numberOfWorker });
        this.worker.on('completed', (job, result) => {
            var _a;
            (_a = this.onWorkerDataCompleted) === null || _a === void 0 ? void 0 : _a.call(this, job, result).then(() => {
                // Do something after processing completed job
            }).catch(error => {
                this.logger.error('[Worker][%s][completed] queue: %s | Error while processing completed job! Error: %s', this.identifier, this.queueName, error);
            });
        });
        this.worker.on('failed', (job, reason) => {
            var _a;
            (_a = this.onWorkerDataFail) === null || _a === void 0 ? void 0 : _a.call(this, job, reason).then(() => {
                // Do something after processing failed job
            }).catch(error => {
                this.logger.error('[Worker][%s][failed] queue: %s | Error while processing completed job! Error: %s', this.identifier, this.queueName, error);
            });
        });
    }
    configure() {
        if (!this.role) {
            this.logger.error('[configure][%s] Invalid client role to configure | Valid roles: [queue|worker]', this.identifier);
            return;
        }
        switch (this.role) {
            case 'queue': {
                this.configureQueue();
                break;
            }
            case 'worker': {
                this.configureWorker();
                break;
            }
        }
    }
}
exports.BullMQHelper = BullMQHelper;
//# sourceMappingURL=bullmq.helper.js.map