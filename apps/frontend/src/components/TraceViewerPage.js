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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceViewerPage = TraceViewerPage;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
function TraceViewerPage() {
    var traceId = (0, react_router_dom_1.useParams)().traceId;
    var _a = (0, react_1.useState)([]), spans = _a[0], setSpans = _a[1];
    var _b = (0, react_1.useState)([]), logs = _b[0], setLogs = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)('trace'), activeTab = _d[0], setActiveTab = _d[1];
    var _e = (0, react_1.useState)(''), logLevelFilter = _e[0], setLogLevelFilter = _e[1];
    var _f = (0, react_1.useState)(''), logTopicFilter = _f[0], setLogTopicFilter = _f[1];
    (0, react_1.useEffect)(function () {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, traceResponse, logsResponse, traceData, logsData, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, Promise.all([
                                    fetch("/api/v1/trace/".concat(traceId)),
                                    fetch("/api/v1/trace/".concat(traceId, "/logs")),
                                ])];
                        case 1:
                            _a = _b.sent(), traceResponse = _a[0], logsResponse = _a[1];
                            if (!traceResponse.ok) {
                                throw new Error("HTTP error! status: ".concat(traceResponse.status));
                            }
                            if (!logsResponse.ok) {
                                throw new Error("HTTP error! status: ".concat(logsResponse.status));
                            }
                            return [4 /*yield*/, traceResponse.json()];
                        case 2:
                            traceData = _b.sent();
                            return [4 /*yield*/, logsResponse.json()];
                        case 3:
                            logsData = _b.sent();
                            setSpans(traceData);
                            setLogs(logsData);
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _b.sent();
                            setError(e_1.message);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        if (traceId) {
            fetchData();
        }
    }, [traceId]);
    var filteredLogs = logs.filter(function (log) {
        return ((logLevelFilter === '' || log.level === logLevelFilter) &&
            (logTopicFilter === '' || log.topic.includes(logTopicFilter)));
    });
    if (error) {
        return <div>Error: {error}</div>;
    }
    var downloadNdjson = function () {
        var ndjson = logs.map(function (log) { return JSON.stringify(log); }).join('\n');
        var blob = new Blob([ndjson], { type: 'application/x-ndjson' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "".concat(traceId, ".ndjson");
        a.click();
        URL.revokeObjectURL(url);
    };
    return (<div>
      <h1>Trace Viewer</h1>
      <h2>Trace ID: {traceId}</h2>
      <div className="tabs">
        <button onClick={function () { return setActiveTab('trace'); }} className={activeTab === 'trace' ? 'active' : ''}>Trace</button>
        <button onClick={function () { return setActiveTab('logs'); }} className={activeTab === 'logs' ? 'active' : ''}>Logs</button>
      </div>

      {activeTab === 'trace' && (<pre>{JSON.stringify(spans, null, 2)}</pre>)}

      {activeTab === 'logs' && (<div>
          <div className="filters">
            <input type="text" placeholder="Filter by level" value={logLevelFilter} onChange={function (e) { return setLogLevelFilter(e.target.value); }}/>
            <input type="text" placeholder="Filter by topic" value={logTopicFilter} onChange={function (e) { return setLogTopicFilter(e.target.value); }}/>
            <button onClick={downloadNdjson}>Export NDJSON</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Level</th>
                <th>Topic</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(function (log) { return (<tr key={log.ts}>
                  <td>{new Date(log.ts).toISOString()}</td>
                  <td>{log.level}</td>
                  <td>{log.topic}</td>
                  <td>{log.msg}</td>
                </tr>); })}
            </tbody>
          </table>
        </div>)}
    </div>);
}
