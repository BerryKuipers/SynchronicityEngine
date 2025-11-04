"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptPlaygroundPage = void 0;
var react_1 = require("react");
var constants_1 = require("./constants");
require("./PromptPlaygroundPage.css");
var AiField_1 = require("./ai/AiField");
var formFields = [
    { name: 'layer', label: 'Layer', type: 'text' },
    { name: 'lawVersion', label: 'Law Version', type: 'text' },
    { name: 'personaVersion', label: 'Persona Version', type: 'text' },
    { name: 'seed', label: 'Seed', type: 'text' },
];
var PromptPlaygroundPage = function () {
    var _a = (0, react_1.useState)(constants_1.initialFormState), formState = _a[0], setFormState = _a[1];
    var _b = (0, react_1.useState)(null), assemblyResponse = _b[0], setAssemblyResponse = _b[1];
    var _c = (0, react_1.useState)(null), generateResponse = _c[0], setGenerateResponse = _c[1];
    var _d = (0, react_1.useState)(false), isAssembling = _d[0], setIsAssembling = _d[1];
    var _e = (0, react_1.useState)(false), isGenerating = _e[0], setIsGenerating = _e[1];
    var handleChange = function (e) {
        var _a;
        setFormState(__assign(__assign({}, formState), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleAiFieldChange = function (name, value) {
        var _a;
        setFormState(__assign(__assign({}, formState), (_a = {}, _a[name] = value, _a)));
    };
    var handleApiCall = function (endpoint, setLoading, setResponse) { return __awaiter(void 0, void 0, void 0, function () {
        var beliefs, world, blueprint, rest, body, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    beliefs = formState.beliefs, world = formState.world, blueprint = formState.blueprint, rest = __rest(formState, ["beliefs", "world", "blueprint"]);
                    body = void 0;
                    try {
                        body = __assign(__assign({}, rest), { beliefs: JSON.parse(beliefs), world: JSON.parse(world), blueprint: JSON.parse(blueprint) });
                    }
                    catch (e) {
                        setResponse({ error: "Invalid JSON format: ".concat(e.message) });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch("/api/v1/prompt/".concat(endpoint), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.message || "Request failed with status ".concat(response.status));
                    }
                    setResponse(data);
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        setResponse({ error: error_1.message });
                    }
                    else {
                        setResponse({ error: 'An unknown error occurred.' });
                    }
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="formContainer">
      <h1>Prompt Playground</h1>

      {formFields.map(function (_a) {
            var name = _a.name, label = _a.label, type = _a.type;
            return (<div key={name} className="formGroup">
          <label className="label">{label}</label>
          <input type={type} name={name} value={formState[name]} onChange={handleChange} className="input"/>
        </div>);
        })}

      <div className="formGroup">
        <label className="label">Beliefs</label>
        <AiField_1.AiField id="beliefs" kind="json" purpose="Enter the beliefs as a JSON object." value={formState.beliefs} onChange={function (value) { return handleAiFieldChange('beliefs', value); }} layer={formState.layer}/>
      </div>

      <div className="formGroup">
        <label className="label">World</label>
        <AiField_1.AiField id="world" kind="json" purpose="Enter the world state as a JSON object." value={formState.world} onChange={function (value) { return handleAiFieldChange('world', value); }} layer={formState.layer}/>
      </div>

      <div className="formGroup">
        <label className="label">Blueprint</label>
        <AiField_1.AiField id="blueprint" kind="json" purpose="Enter the blueprint as a JSON object." value={formState.blueprint} onChange={function (value) { return handleAiFieldChange('blueprint', value); }} layer={formState.layer}/>
      </div>

      <div className="formGroup">
        <label className="label">User Intent</label>
        <AiField_1.AiField id="userIntent" kind="short_text" purpose="Enter the user's intent." value={formState.userIntent} onChange={function (value) { return handleAiFieldChange('userIntent', value); }} layer={formState.layer}/>
      </div>

      <div>
        <button onClick={function () { return handleApiCall('assemble', setIsAssembling, setAssemblyResponse); }} className="button" disabled={isAssembling}>
          {isAssembling ? 'Assembling...' : 'Assemble'}
        </button>
        <button onClick={function () { return handleApiCall('generate', setIsGenerating, setGenerateResponse); }} className="button" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {assemblyResponse && (<div className="responseContainer">
          <h2>Assembly Response</h2>
          <pre>{JSON.stringify(assemblyResponse, null, 2)}</pre>
        </div>)}

      {generateResponse && (<div className="responseContainer">
          <h2>Generate Response</h2>
          <pre>{JSON.stringify(generateResponse, null, 2)}</pre>
        </div>)}
    </div>);
};
exports.PromptPlaygroundPage = PromptPlaygroundPage;
