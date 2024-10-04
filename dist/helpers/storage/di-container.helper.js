"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIContainerHelper = void 0;
class DIContainerHelper {
    constructor() {
        this.container = Object.assign({});
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DIContainerHelper();
        }
        return this.instance;
    }
    static newInstance() {
        return new DIContainerHelper();
    }
    get(key) {
        return this.container[key];
    }
    set(key, value) {
        this.container = Object.assign(this.container, { [key]: value });
    }
    keys() {
        return Object.keys(this.container);
    }
}
exports.DIContainerHelper = DIContainerHelper;
//# sourceMappingURL=di-container.helper.js.map