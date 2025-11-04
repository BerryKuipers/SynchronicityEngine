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
exports.default = default_1;
var prompt_kit_1 = require("@synchronicity/prompt-kit");
var zod_1 = require("zod");
var zod_to_json_schema_1 = require("zod-to-json-schema");
var crypto_1 = require("crypto");
var LLM_PROVIDER = process.env.LLM_PROVIDER || 'mock';
var beliefSchema = zod_1.z.object({
    id: zod_1.z.string(),
    description: zod_1.z.string(),
    intensity: zod_1.z.number(),
    rigidity: zod_1.z.number(),
});
var beliefOverlaySchema = zod_1.z.object({
    beliefs: zod_1.z.array(beliefSchema),
});
var worldStateSchema = zod_1.z.object({
    time: zod_1.z.number(),
    energy: zod_1.z.number(),
    resonance: zod_1.z.number(),
    narrative: zod_1.z.string(),
});
var blueprintSchema = zod_1.z.object({
    themes: zod_1.z.array(zod_1.z.string()),
    excitement: zod_1.z.array(zod_1.z.object({
        keywords: zod_1.z.array(zod_1.z.string()),
        intensity: zod_1.z.number(),
    })),
});
var promptAssemblyInputSchema = zod_1.z.object({
    layer: zod_1.z.enum(['physical', 'higher', 'soul', 'oversoul']),
    lawVersion: zod_1.z.string(),
    personaVersion: zod_1.z.string(),
    beliefs: beliefOverlaySchema,
    world: worldStateSchema,
    blueprint: blueprintSchema,
    userIntent: zod_1.z.string(),
    seed: zod_1.z.number(),
    guardrails: zod_1.z.array(zod_1.z.string()).optional(),
});
function default_1(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.get('/assemble', { schema: { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(promptAssemblyInputSchema) } }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var chatAssembly;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, prompt_kit_1.assembleChat)(request.query)];
                        case 1:
                            chatAssembly = _a.sent();
                            reply.send(chatAssembly);
                            return [2 /*return*/];
                    }
                });
            }); });
            fastify.post('/generate', { schema: { body: (0, zod_to_json_schema_1.zodToJsonSchema)(promptAssemblyInputSchema) } }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var createTraceContext, _a, log, trace, body, assembleSpanId, chatAssembly, generateSpanId, llmResponse, directOpenAiAdapter, langChainAdapter, mockDeterministicAdapter, _b, error_1, validated, repaired, reasons;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            createTraceContext = fastify.createTraceContext;
                            _a = createTraceContext(), log = _a.log, trace = _a.trace;
                            body = request.body;
                            assembleSpanId = (0, crypto_1.randomUUID)();
                            trace({
                                spanId: assembleSpanId,
                                phase: 'assemble',
                                inputs: {
                                    beliefsDigest: (0, prompt_kit_1.makeDigest)(body.beliefs),
                                    worldDigest: (0, prompt_kit_1.makeDigest)(body.world),
                                    blueprintDigest: (0, prompt_kit_1.makeDigest)(body.blueprint),
                                    personaVersion: body.personaVersion,
                                    lawVersion: body.lawVersion,
                                },
                            });
                            return [4 /*yield*/, (0, prompt_kit_1.assembleChat)(request.body)];
                        case 1:
                            chatAssembly = _c.sent();
                            log({
                                level: 'info',
                                topic: 'assemble.done',
                                msg: 'Chat assembly complete',
                                data: {
                                    beliefsDigest: (0, prompt_kit_1.makeDigest)(body.beliefs),
                                    worldDigest: (0, prompt_kit_1.makeDigest)(body.world),
                                    blueprintDigest: (0, prompt_kit_1.makeDigest)(body.blueprint),
                                    lawVersion: body.lawVersion,
                                    personaVersion: body.personaVersion,
                                },
                            });
                            generateSpanId = (0, crypto_1.randomUUID)();
                            trace({
                                spanId: generateSpanId,
                                parentSpanId: assembleSpanId,
                                phase: 'generate',
                                seed: request.body.seed,
                                inputs: {
                                    provider: LLM_PROVIDER,
                                },
                            });
                            log({
                                level: 'info',
                                topic: 'adapter.call',
                                msg: "Calling LLM provider: ".concat(LLM_PROVIDER),
                                data: {
                                    provider: LLM_PROVIDER,
                                    // TODO: Add model when available
                                },
                            });
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 9, , 10]);
                            directOpenAiAdapter = new prompt_kit_1.DirectOpenAIAdapter({ apiKey: process.env.OPENAI_API_KEY });
                            langChainAdapter = new prompt_kit_1.LangChainAdapter();
                            mockDeterministicAdapter = new prompt_kit_1.MockDeterministicAdapter();
                            _b = LLM_PROVIDER;
                            switch (_b) {
                                case 'openai': return [3 /*break*/, 3];
                                case 'langchain': return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 3: return [4 /*yield*/, directOpenAiAdapter.generate(chatAssembly.system, chatAssembly.user)];
                        case 4:
                            llmResponse = _c.sent();
                            return [3 /*break*/, 8];
                        case 5: return [4 /*yield*/, langChainAdapter.generate(chatAssembly.system, chatAssembly.user)];
                        case 6:
                            llmResponse = _c.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            llmResponse = mockDeterministicAdapter.generate(chatAssembly.system, chatAssembly.user);
                            _c.label = 8;
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            error_1 = _c.sent();
                            log({
                                level: 'error',
                                topic: 'adapter.error',
                                msg: 'Error calling LLM provider',
                                data: {
                                    error: error_1.message,
                                },
                            });
                            throw error_1;
                        case 10:
                            validated = true;
                            repaired = false;
                            reasons = ['TODO: Add validation reasons'];
                            trace({
                                spanId: (0, crypto_1.randomUUID)(),
                                parentSpanId: generateSpanId,
                                phase: 'validate',
                                outputs: {
                                    validated: validated,
                                    repaired: repaired,
                                    event: llmResponse, // Redact large fields if needed
                                },
                                reasons: reasons,
                            });
                            log({
                                level: 'info',
                                topic: 'adapter.result',
                                msg: 'LLM response received and validated',
                                data: {
                                    validated: validated,
                                    repaired: repaired,
                                    // TODO: Add eventType and intensity when available
                                    reasons: reasons,
                                },
                            });
                            reply.send({
                                messages: {
                                    system: chatAssembly.system,
                                    user: chatAssembly.user,
                                },
                                meta: chatAssembly.meta,
                                llm: llmResponse,
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
