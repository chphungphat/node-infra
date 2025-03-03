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
        const { cronTime, onTick, onCompleted, autoStart = false, tz, utcOffset, runOnInit, errorHandler, } = opts;
        this.cronTime = cronTime;
        this.onTick = onTick;
        this.onCompleted = onCompleted;
        this.autoStart = autoStart !== null && autoStart !== void 0 ? autoStart : false;
        this.tz = tz;
        this.utcOffset = utcOffset;
        this.runOnInit = runOnInit;
        this.errorHandler = errorHandler;
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
        if (this.tz && this.utcOffset) {
            throw (0, utilities_1.getError)({
                message: '[CronHelper][configure] Invalid timezone and utcOffset to configure application cron!',
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
            runOnInit: this.runOnInit,
            errorHandler: this.errorHandler,
        });
        if (this.tz) {
            this.instance = cron_1.CronJob.from({
                cronTime: this.cronTime,
                onTick: this.onTick,
                onComplete: this.onCompleted,
                start: this.autoStart,
                timeZone: this.tz,
                runOnInit: this.runOnInit,
                errorHandler: this.errorHandler,
            });
        }
        if (this.utcOffset) {
            this.instance = cron_1.CronJob.from({
                cronTime: this.cronTime,
                onTick: this.onTick,
                onComplete: this.onCompleted,
                start: this.autoStart,
                utcOffset: this.utcOffset,
                runOnInit: this.runOnInit,
            });
        }
    }
    start() {
        if (!this.instance) {
            this.logger.error('[CronHelper][start] Invalid cron instance to start cronjob!');
            return;
        }
        this.instance.start();
    }
    modifyCronTime(cronTime) {
        var _a;
        const cronTimeValid = (0, cron_1.validateCronExpression)(cronTime);
        if (!(cronTimeValid === null || cronTimeValid === void 0 ? void 0 : cronTimeValid.valid)) {
            this.logger.error('[CronHelper][modifyCronTime] Error %s', (_a = cronTimeValid === null || cronTimeValid === void 0 ? void 0 : cronTimeValid.error) !== null && _a !== void 0 ? _a : 'Invalid cronTime to modify cron!');
            throw (0, utilities_1.getError)({
                message: '[CronHelper][modifyCronTime] Invalid cronTime to modify cron!',
            });
        }
        try {
            this.instance.setTime(new cron_1.CronTime(cronTime));
            this.instance.start();
            this.logger.info('[CronHelper][modifyCronTime] Cron time modified successfully!');
        }
        catch (error) {
            this.logger.error('[CronHelper][modifyCronTime] Error %s', error);
            if (!this.instance.isActive) {
                this.instance.start();
            }
            throw (0, utilities_1.getError)({
                message: '[CronHelper][modifyCronTime] Error modifying cron time!',
            });
        }
    }
}
exports.CronHelper = CronHelper;
//# sourceMappingURL=cron.helper.js.map