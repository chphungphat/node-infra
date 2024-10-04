"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronHelper = void 0;
const base_helper_1 = require("../base/base.helper");
const utilities_1 = require("../utilities");
const cron_1 = require("cron");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
// --------------------------------------------------------
class CronHelper extends base_helper_1.BaseHelper {
    constructor(opts) {
        var _a;
        super({ scope: CronHelper.name, identifier: (_a = opts.cronTime) !== null && _a !== void 0 ? _a : CronHelper.name });
        const { cronTime, onTick, onCompleted, autoStart = false, tz } = opts;
        this.cronTime = cronTime;
        this.onTick = onTick;
        this.onCompleted = onCompleted;
        this.autoStart = autoStart !== null && autoStart !== void 0 ? autoStart : false;
        this.tz = tz;
        this.configure();
    }
    static newInstance(opts) {
        return new CronHelper(opts);
    }
    configure() {
        if (!this.cronTime || (0, isEmpty_1.default)(this.cronTime)) {
            throw (0, utilities_1.getError)({
                message: '[CronHelper][configure] Invalid cronTime to configure application cron!',
            });
        }
        /* this.instance = new CronJob(
          this.cronTime,
          () => {
            this.onTick?.();
          },
          () => {
            this.onCompleted?.();
          },
          this.autoStart,
        ); */
        this.instance = cron_1.CronJob.from({
            cronTime: this.cronTime,
            onTick: this.onTick,
            onComplete: this.onCompleted,
            start: this.autoStart,
            timeZone: this.tz,
        });
    }
    start() {
        if (!this.instance) {
            this.logger.error('[CronHelper][start] Invalid cron instance to start cronjob!');
            return;
        }
        this.instance.start();
    }
}
exports.CronHelper = CronHelper;
//# sourceMappingURL=cron.helper.js.map