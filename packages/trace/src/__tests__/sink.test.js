"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sink_1 = require("../sink");
var fs_1 = require("fs");
var path_1 = require("path");
describe('createInMemoryWithNdjson', function () {
    var traceDir = 'var/test-traces';
    var sink;
    beforeEach(function () {
        fs_1.default.mkdirSync(traceDir, { recursive: true });
        sink = (0, sink_1.createInMemoryWithNdjson)(traceDir);
    });
    afterEach(function () {
        fs_1.default.rmSync(traceDir, { recursive: true, force: true });
    });
    it('should append a span to the in-memory store and to the ndjson file', function () {
        var span = {
            traceId: 'test-trace',
            runId: 'test-run',
            spanId: 'test-span',
            phase: 'assemble',
            ts: Date.now(),
        };
        sink.append(span);
        var spans = sink.get('test-trace');
        expect(spans).toHaveLength(1);
        expect(spans[0]).toEqual(span);
        var ndjson = fs_1.default.readFileSync(path_1.default.join(traceDir, 'test-trace.ndjson'), 'utf-8');
        expect(ndjson).toEqual(JSON.stringify(span) + '\n');
    });
});
