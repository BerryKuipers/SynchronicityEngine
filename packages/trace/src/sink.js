"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInMemoryWithNdjson = createInMemoryWithNdjson;
var fs_1 = require("fs");
var path_1 = require("path");
function createInMemoryWithNdjson(dir) {
    var traces = new Map();
    fs_1.default.mkdirSync(dir, { recursive: true });
    return {
        append: function (span) {
            var _a;
            if (!traces.has(span.traceId)) {
                traces.set(span.traceId, []);
            }
            (_a = traces.get(span.traceId)) === null || _a === void 0 ? void 0 : _a.push(span);
            fs_1.default.appendFileSync(path_1.default.join(dir, "".concat(span.traceId, ".ndjson")), JSON.stringify(span) + '\n');
        },
        head: function (traceId) {
            // For now, returning all spans.
            // TODO: Implement proper head logic
            return traces.get(traceId) || [];
        },
        get: function (traceId) {
            return traces.get(traceId) || [];
        },
    };
}
