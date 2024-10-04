"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
const application_logger_1 = require("./application-logger");
class LoggerFactory {
    static getLogger(scopes) {
        const logger = new application_logger_1.ApplicationLogger();
        logger.withScope(scopes.join('-'));
        return logger;
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=factory.js.map