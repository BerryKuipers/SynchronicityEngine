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
exports.DirectOpenAIAdapter = void 0;
var openai_1 = require("openai");
var zod_to_json_schema_1 = require("zod-to-json-schema");
var event_1 = require("../schema/event");
var openai = null;
function getClient(apiKey) {
    if (!openai) {
        openai = new openai_1.default({
            apiKey: apiKey !== null && apiKey !== void 0 ? apiKey : process.env.OPENAI_API_KEY,
        });
    }
    return openai;
}
var STRICT_JSON = process.env.STRICT_JSON === 'true';
var REPAIR_PROMPT = "Return only the tool call 'emit_event_payload' with a JSON argument that matches the provided JSON Schema exactly. No prose. No markdown. No extra keys. If a value is unknown, choose the safest default and set confidence \u2264 0.3.";
var DirectOpenAIAdapter = /** @class */ (function () {
    function DirectOpenAIAdapter(config) {
        this.config = config;
    }
    DirectOpenAIAdapter.prototype.generate = function (system, user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var client, messages, tools, completion, toolCall, repairedToolCall, payload_1, payload;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        client = getClient((_a = this.config) === null || _a === void 0 ? void 0 : _a.apiKey);
                        messages = [
                            { role: 'system', content: system },
                            { role: 'user', content: user },
                        ];
                        tools = [
                            {
                                type: 'function',
                                function: {
                                    name: 'emit_event_payload',
                                    description: 'Emits a structured engine event.',
                                    parameters: (0, zod_to_json_schema_1.zodToJsonSchema)(event_1.EngineEventPayloadSchema),
                                },
                            },
                        ];
                        return [4 /*yield*/, client.chat.completions.create({
                                model: 'gpt-4-turbo-preview',
                                messages: messages,
                                tools: tools,
                                tool_choice: STRICT_JSON
                                    ? { type: 'function', function: { name: 'emit_event_payload' } }
                                    : 'auto',
                                seed: options === null || options === void 0 ? void 0 : options.seed,
                            })];
                    case 1:
                        completion = _d.sent();
                        toolCall = (_b = completion.choices[0].message.tool_calls) === null || _b === void 0 ? void 0 : _b[0];
                        if (!!toolCall) return [3 /*break*/, 3];
                        if (STRICT_JSON) {
                            throw new Error('STRICT_JSON: No tool call was returned.');
                        }
                        messages.push(completion.choices[0].message);
                        messages.push({ role: 'user', content: REPAIR_PROMPT });
                        return [4 /*yield*/, client.chat.completions.create({
                                model: 'gpt-4-turbo-preview',
                                messages: messages,
                                tools: tools,
                                tool_choice: {
                                    type: 'function',
                                    function: { name: 'emit_event_payload' },
                                },
                                seed: options === null || options === void 0 ? void 0 : options.seed,
                            })];
                    case 2:
                        completion = _d.sent();
                        repairedToolCall = (_c = completion.choices[0].message.tool_calls) === null || _c === void 0 ? void 0 : _c[0];
                        if (!repairedToolCall) {
                            throw new Error('Failed to repair JSON output.');
                        }
                        payload_1 = JSON.parse(repairedToolCall.function.arguments);
                        return [2 /*return*/, event_1.EngineEventPayloadSchema.parse(payload_1)];
                    case 3:
                        payload = JSON.parse(toolCall.function.arguments);
                        return [2 /*return*/, event_1.EngineEventPayloadSchema.parse(payload)];
                }
            });
        });
    };
    return DirectOpenAIAdapter;
}());
exports.DirectOpenAIAdapter = DirectOpenAIAdapter;
