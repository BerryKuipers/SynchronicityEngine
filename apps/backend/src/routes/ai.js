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
var fillBodySchema = {
    type: 'object',
    properties: {
        layer: { type: 'string' },
        lawVersion: { type: 'string' },
        personaVersion: { type: 'string' },
        seed: { type: 'number' },
        beliefs: { type: 'object' },
        world: { type: 'object' },
        blueprint: { type: 'object' },
        field: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                kind: {
                    type: 'string',
                    enum: ['short_text', 'long_text', 'json', 'title', 'tags'],
                },
                purpose: { type: 'string' },
                constraints: { type: 'object' },
                currentValue: { type: 'string' },
            },
            required: ['id', 'kind', 'purpose'],
        },
        extraContext: { type: 'object' },
    },
    required: ['layer', 'field'],
};
function selectAdapter() {
    if (process.env.OPENAI_API_KEY) {
        return new prompt_kit_1.DirectOpenAIAdapter({ apiKey: process.env.OPENAI_API_KEY });
    }
    return new prompt_kit_1.MockDeterministicAdapter();
}
function default_1(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.post('/api/v1/ai/fill', { schema: { body: fillBodySchema } }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, layer, lawVersion, personaVersion, seed, beliefs, world, blueprint, field, extraContext, userIntent, assembly, adapter, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.body, layer = _a.layer, lawVersion = _a.lawVersion, personaVersion = _a.personaVersion, seed = _a.seed, beliefs = _a.beliefs, world = _a.world, blueprint = _a.blueprint, field = _a.field, extraContext = _a.extraContext;
                            userIntent = "Fill the field '".concat(field.id, "' (").concat(field.kind, ") with the purpose: ").concat(field.purpose, ". Current value is: '").concat(JSON.stringify(field.currentValue), "'. Constraints: ").concat(JSON.stringify(field.constraints), ". Extra context: ").concat(JSON.stringify(extraContext));
                            return [4 /*yield*/, (0, prompt_kit_1.assembleChat)({
                                    layer: layer,
                                    lawVersion: lawVersion !== null && lawVersion !== void 0 ? lawVersion : 'default',
                                    personaVersion: personaVersion !== null && personaVersion !== void 0 ? personaVersion : 'default',
                                    seed: seed !== null && seed !== void 0 ? seed : 0,
                                    beliefs: beliefs !== null && beliefs !== void 0 ? beliefs : { beliefs: [] },
                                    world: world !== null && world !== void 0 ? world : {},
                                    blueprint: blueprint !== null && blueprint !== void 0 ? blueprint : { themes: [], excitement: [] },
                                    userIntent: userIntent,
                                })];
                        case 1:
                            assembly = _b.sent();
                            adapter = selectAdapter();
                            return [4 /*yield*/, adapter.generate(assembly.system, assembly.user, {
                                    seed: seed,
                                })];
                        case 2:
                            result = _b.sent();
                            // TODO: map confidence from result
                            return [2 /*return*/, reply.send({
                                    text: result,
                                    confidence: 0.9,
                                    seedUsed: seed,
                                    promptHash: assembly.meta.promptHash,
                                    reasons: ['mocked response'],
                                })];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
