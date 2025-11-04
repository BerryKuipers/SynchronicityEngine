"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexer_1 = require("../indexer");
describe('LogIndexer', function () {
    it('should index and retrieve logs by traceId', function () {
        var indexer = new indexer_1.LogIndexer();
        var record = {
            ts: Date.now(),
            level: 'info',
            topic: 'test',
            msg: 'test message',
            traceId: 'test-trace',
        };
        indexer.add(record);
        var logs = indexer.findByTraceId('test-trace');
        expect(logs).toHaveLength(1);
        expect(logs[0]).toEqual(record);
    });
    it('should index and retrieve logs by topic', function () {
        var indexer = new indexer_1.LogIndexer();
        var record = {
            ts: Date.now(),
            level: 'info',
            topic: 'test-topic',
            msg: 'test message',
        };
        indexer.add(record);
        var logs = indexer.findByTopic('test-topic');
        expect(logs).toHaveLength(1);
        expect(logs[0]).toEqual(record);
    });
});
