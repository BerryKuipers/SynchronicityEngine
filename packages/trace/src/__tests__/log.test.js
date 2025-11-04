"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../log");
var fs_1 = require("fs");
var path_1 = require("path");
describe('createNdjsonLogger', function () {
    var logDir = 'var/test-logs';
    var sink;
    beforeEach(function () {
        fs_1.default.mkdirSync(logDir, { recursive: true });
        sink = (0, log_1.createNdjsonLogger)(logDir, 'test-app');
    });
    afterEach(function () {
        fs_1.default.rmSync(logDir, { recursive: true, force: true });
    });
    it('should write a log record to the correct ndjson file', function () {
        var record = {
            ts: Date.now(),
            level: 'info',
            topic: 'test',
            msg: 'test message',
        };
        sink.write(record);
        var today = new Date();
        var year = today.getUTCFullYear();
        var month = (today.getUTCMonth() + 1).toString().padStart(2, '0');
        var day = today.getUTCDate().toString().padStart(2, '0');
        var logFilePath = path_1.default.join(logDir, "".concat(year, "-").concat(month, "-").concat(day), 'test-app.ndjson');
        var ndjson = fs_1.default.readFileSync(logFilePath, 'utf-8');
        expect(ndjson).toEqual(JSON.stringify(record) + '\n');
    });
});
