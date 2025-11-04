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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var trace_1 = require("@synchronicity/trace");
var fs_1 = require("fs");
var path_1 = require("path");
var readline_1 = require("readline");
var stream_1 = require("stream");
function default_1(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        function loadLogsForDate(date, app) {
            return __awaiter(this, void 0, void 0, function () {
                var filePath, fileStream, rl, _a, rl_1, rl_1_1, line, record, e_1_1, error_1;
                var _b, e_1, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            filePath = path_1.default.join('var/logs', date, "".concat(app, ".ndjson"));
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 14, , 15]);
                            fileStream = fs_1.default.createReadStream(filePath);
                            rl = readline_1.default.createInterface({
                                input: fileStream,
                                crlfDelay: Infinity,
                            });
                            _e.label = 2;
                        case 2:
                            _e.trys.push([2, 7, 8, 13]);
                            _a = true, rl_1 = __asyncValues(rl);
                            _e.label = 3;
                        case 3: return [4 /*yield*/, rl_1.next()];
                        case 4:
                            if (!(rl_1_1 = _e.sent(), _b = rl_1_1.done, !_b)) return [3 /*break*/, 6];
                            _d = rl_1_1.value;
                            _a = false;
                            line = _d;
                            record = JSON.parse(line);
                            indexer.add(record);
                            _e.label = 5;
                        case 5:
                            _a = true;
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 13];
                        case 7:
                            e_1_1 = _e.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 13];
                        case 8:
                            _e.trys.push([8, , 11, 12]);
                            if (!(!_a && !_b && (_c = rl_1.return))) return [3 /*break*/, 10];
                            return [4 /*yield*/, _c.call(rl_1)];
                        case 9:
                            _e.sent();
                            _e.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 12: return [7 /*endfinally*/];
                        case 13: return [3 /*break*/, 15];
                        case 14:
                            error_1 = _e.sent();
                            return [3 /*break*/, 15];
                        case 15: return [2 /*return*/];
                    }
                });
            });
        }
        function getLogs(date, app) {
            return __awaiter(this, void 0, void 0, function () {
                var filePath, fileContent, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            filePath = path_1.default.join('var/logs', date, "".concat(app, ".ndjson"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, fs_1.default.promises.readFile(filePath, 'utf-8')];
                        case 2:
                            fileContent = _a.sent();
                            return [2 /*return*/, fileContent.split('\n').filter(Boolean).map(function (line) { return JSON.parse(line); })];
                        case 3:
                            error_2 = _a.sent();
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var logSink, traceSink, indexer, today;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logSink = fastify.logSink, traceSink = fastify.traceSink;
                    indexer = new trace_1.LogIndexer();
                    today = new Date().toISOString().split('T')[0];
                    return [4 /*yield*/, loadLogsForDate(today, 'backend')];
                case 1:
                    _a.sent();
                    fastify.get('/api/v1/logs/tail', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, lines, _c, level, today, logs, filteredLogs;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _a = request.query, _b = _a.lines, lines = _b === void 0 ? 200 : _b, _c = _a.level, level = _c === void 0 ? 'info' : _c;
                                    today = new Date().toISOString().split('T')[0];
                                    return [4 /*yield*/, getLogs(today, 'backend')];
                                case 1:
                                    logs = _d.sent();
                                    filteredLogs = logs.filter(function (log) { return log.level === level; }).slice(-lines);
                                    reply.send(filteredLogs);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    fastify.post('/api/v1/logs/search', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, fromTs, toTs, level, traceId, runId, spanId, layer, phase, topic, text, _b, limit, results, today_1, filteredLogs;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = request.body, fromTs = _a.fromTs, toTs = _a.toTs, level = _a.level, traceId = _a.traceId, runId = _a.runId, spanId = _a.spanId, layer = _a.layer, phase = _a.phase, topic = _a.topic, text = _a.text, _b = _a.limit, limit = _b === void 0 ? 1000 : _b;
                                    results = [];
                                    if (!traceId) return [3 /*break*/, 1];
                                    results = indexer.findByTraceId(traceId);
                                    return [3 /*break*/, 5];
                                case 1:
                                    if (!runId) return [3 /*break*/, 2];
                                    results = indexer.findByRunId(runId);
                                    return [3 /*break*/, 5];
                                case 2:
                                    if (!topic) return [3 /*break*/, 3];
                                    results = indexer.findByTopic(topic);
                                    return [3 /*break*/, 5];
                                case 3:
                                    today_1 = new Date().toISOString().split('T')[0];
                                    return [4 /*yield*/, getLogs(today_1, 'backend')];
                                case 4:
                                    results = _c.sent();
                                    _c.label = 5;
                                case 5:
                                    filteredLogs = results.filter(function (log) {
                                        if (fromTs && log.ts < fromTs)
                                            return false;
                                        if (toTs && log.ts > toTs)
                                            return false;
                                        if (level && log.level !== level)
                                            return false;
                                        if (layer && log.layer !== layer)
                                            return false;
                                        if (phase && log.phase !== phase)
                                            return false;
                                        if (spanId && log.spanId !== spanId)
                                            return false;
                                        if (text && !log.msg.includes(text))
                                            return false;
                                        return true;
                                    });
                                    reply.send(filteredLogs.slice(0, limit));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    fastify.get('/api/v1/trace/:traceId/logs', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                        var traceId, logs;
                        return __generator(this, function (_a) {
                            traceId = request.params.traceId;
                            logs = indexer.findByTraceId(traceId);
                            reply.send(logs);
                            return [2 /*return*/];
                        });
                    }); });
                    fastify.get('/api/v1/logs/stream', function (request, reply) {
                        var _a = request.query.level, level = _a === void 0 ? 'info' : _a;
                        reply.raw.setHeader('Content-Type', 'text/event-stream');
                        reply.raw.setHeader('Cache-Control', 'no-cache');
                        reply.raw.setHeader('Connection', 'keep-alive');
                        var stream = new stream_1.PassThrough();
                        var sendLog = function (log) {
                            if (log.level === level) {
                                stream.write("data: ".concat(JSON.stringify(log), "\n\n"));
                            }
                        };
                        var today = new Date().toISOString().split('T')[0];
                        var filePath = path_1.default.join('var/logs', today, 'backend.ndjson');
                        var fileSize = fs_1.default.existsSync(filePath) ? fs_1.default.statSync(filePath).size : 0;
                        var interval = setInterval(function () {
                            var newSize = fs_1.default.existsSync(filePath) ? fs_1.default.statSync(filePath).size : 0;
                            if (newSize > fileSize) {
                                var stream_2 = fs_1.default.createReadStream(filePath, { start: fileSize, end: newSize });
                                var rl = readline_1.default.createInterface({ input: stream_2 });
                                rl.on('line', function (line) {
                                    var record = JSON.parse(line);
                                    sendLog(record);
                                });
                                fileSize = newSize;
                            }
                        }, 1000);
                        stream.pipe(reply.raw);
                        request.raw.on('close', function () {
                            clearInterval(interval);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
