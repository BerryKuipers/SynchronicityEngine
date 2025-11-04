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
exports.MainPage = void 0;
var react_1 = require("react");
var client_js_1 = require("../api/client.js");
var ActionList_js_1 = require("./ActionList.js");
var ResonancePanel_js_1 = require("./ResonancePanel.js");
var DEFAULT_SESSION_ID = 'local-demo-session';
var MainPage = function () {
    var sessionId = (0, react_1.useState)(DEFAULT_SESSION_ID)[0];
    var _a = (0, react_1.useState)(null), snapshot = _a[0], setSnapshot = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var loadSnapshot = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, client_js_1.fetchSnapshot)(sessionId)];
                case 2:
                    data = _a.sent();
                    setSnapshot(data);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1 instanceof Error ? err_1.message : 'An unknown error occurred');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [sessionId]);
    (0, react_1.useEffect)(function () {
        void loadSnapshot();
    }, [loadSnapshot]);
    var handleAction = (0, react_1.useCallback)(function (actionId) { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, client_js_1.submitAction)(sessionId, actionId)];
                case 2:
                    result = _a.sent();
                    setSnapshot(result.snapshot);
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    setError(err_2.message);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [sessionId]);
    var latestNarrative = (0, react_1.useMemo)(function () {
        if (!(snapshot === null || snapshot === void 0 ? void 0 : snapshot.history.length)) {
            return null;
        }
        return snapshot.history[snapshot.history.length - 1];
    }, [snapshot]);
    return (<div className="app-shell">
      <header>
        <h1>SynchronicityEngine</h1>
        <p className="session">Session: {sessionId}</p>
      </header>
      {error && <div className="error">{error}</div>}
      {snapshot ? (<main>
          <ResonancePanel_js_1.ResonancePanel resonance={snapshot.resonance} level={snapshot.resonanceLevel} energy={snapshot.energy}/>
          <section className="scene">
            <h2>{snapshot.title}</h2>
            <p className="summary">{snapshot.summary}</p>
            {latestNarrative && (<p className="narrative">
                Last action: {latestNarrative.narrative} ({latestNarrative.resonanceLevel})
              </p>)}
            <ActionList_js_1.ActionList actions={snapshot.availableActions} onSelect={handleAction} disabled={loading}/>
          </section>
          <section className="history">
            <h2>History</h2>
            <ul>
              {snapshot.history.map(function (entry) { return (<li key={"".concat(entry.timestamp, "-").concat(entry.actionId)}>
                  <span className="timestamp">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                  <span className="detail">{entry.narrative}</span>
                  <span className="level">{entry.resonanceLevel}</span>
                </li>); })}
            </ul>
          </section>
        </main>) : (<div className="loading-state">{loading ? 'Loading session...' : 'Preparing session...'}</div>)}
      <footer>
        <button type="button" onClick={function () { return void loadSnapshot(); }} disabled={loading}>
          Refresh snapshot
        </button>
      </footer>
    </div>);
};
exports.MainPage = MainPage;
