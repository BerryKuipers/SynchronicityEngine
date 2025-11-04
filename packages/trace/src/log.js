"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNdjsonLogger = createNdjsonLogger;
var fs_1 = require("fs");
var path_1 = require("path");
function createNdjsonLogger(dir, app) {
    function getLogFilePath() {
        var now = new Date();
        var year = now.getUTCFullYear();
        var month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
        var day = now.getUTCDate().toString().padStart(2, '0');
        var logDir = path_1.default.join(dir, "".concat(year, "-").concat(month, "-").concat(day));
        fs_1.default.mkdirSync(logDir, { recursive: true });
        return path_1.default.join(logDir, "".concat(app, ".ndjson"));
    }
    return {
        write: function (r) {
            var filePath = getLogFilePath();
            fs_1.default.appendFileSync(filePath, JSON.stringify(r) + '\n');
        },
    };
}
