"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogIndexer = void 0;
// TODO: This is a placeholder implementation. A more robust implementation
// would use a proper in-memory database or a more efficient indexing strategy.
var LogIndexer = /** @class */ (function () {
    function LogIndexer() {
        this.byTraceId = new Map();
        this.byRunId = new Map();
        this.byTopic = new Map();
    }
    LogIndexer.prototype.add = function (record) {
        var _a, _b, _c;
        if (record.traceId) {
            if (!this.byTraceId.has(record.traceId)) {
                this.byTraceId.set(record.traceId, []);
            }
            (_a = this.byTraceId.get(record.traceId)) === null || _a === void 0 ? void 0 : _a.push(record);
        }
        if (record.runId) {
            if (!this.byRunId.has(record.runId)) {
                this.byRunId.set(record.runId, []);
            }
            (_b = this.byRunId.get(record.runId)) === null || _b === void 0 ? void 0 : _b.push(record);
        }
        if (!this.byTopic.has(record.topic)) {
            this.byTopic.set(record.topic, []);
        }
        (_c = this.byTopic.get(record.topic)) === null || _c === void 0 ? void 0 : _c.push(record);
    };
    LogIndexer.prototype.findByTraceId = function (traceId) {
        return this.byTraceId.get(traceId) || [];
    };
    LogIndexer.prototype.findByRunId = function (runId) {
        return this.byRunId.get(runId) || [];
    };
    LogIndexer.prototype.findByTopic = function (topic) {
        return this.byTopic.get(topic) || [];
    };
    return LogIndexer;
}());
exports.LogIndexer = LogIndexer;
