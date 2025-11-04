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
exports.assembleChat = assembleChat;
exports.assemblePrompt = assemblePrompt;
var path = require("path");
var LawRegistry_1 = require("./LawRegistry");
var PersonaRegistry_1 = require("./PersonaRegistry");
var BeliefRenderer_1 = require("./render/BeliefRenderer");
var WorldStateRenderer_1 = require("./render/WorldStateRenderer");
var BlueprintRenderer_1 = require("./render/BlueprintRenderer");
var GuardrailsComposer_1 = require("./render/GuardrailsComposer");
var utils_1 = require("./utils");
var promptsBasePath = path.join(__dirname, '..', '..', '..', 'config', 'prompts');
var lawRegistry = new LawRegistry_1.LawRegistry(promptsBasePath);
var personaRegistry = new PersonaRegistry_1.PersonaRegistry(promptsBasePath);
var beliefRenderer = new BeliefRenderer_1.BeliefRenderer();
var worldStateRenderer = new WorldStateRenderer_1.WorldStateRenderer();
var blueprintRenderer = new BlueprintRenderer_1.BlueprintRenderer();
function assembleChat(i) {
    return __awaiter(this, void 0, void 0, function () {
        var law, persona, systemParts, userParts, system, user, _a, truncSystem, truncUser, promptHash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, lawRegistry.load({ layer: i.layer }, { version: i.lawVersion })];
                case 1:
                    law = _b.sent();
                    return [4 /*yield*/, personaRegistry.load(null, {
                            version: i.personaVersion,
                        })];
                case 2:
                    persona = _b.sent();
                    systemParts = [
                        law.body,
                        persona.body,
                        (0, GuardrailsComposer_1.renderGuardrails)(String(i.seed), i.guardrails),
                    ];
                    userParts = [
                        beliefRenderer.render(i.beliefs),
                        worldStateRenderer.render(i.world),
                        blueprintRenderer.render(i.blueprint),
                        "[USER INTENT]\n".concat(i.userIntent),
                    ];
                    system = systemParts.join('\n\n');
                    user = userParts.join('\n\n');
                    if (process.env.MODEL_MAX_TOKENS) {
                        _a = (0, utils_1.truncateForModel)(system, user, parseInt(process.env.MODEL_MAX_TOKENS, 10)), truncSystem = _a.system, truncUser = _a.user;
                        system = truncSystem;
                        user = truncUser;
                    }
                    promptHash = (0, utils_1.createSha256Hash)(system + '\n---\n' + user);
                    return [2 /*return*/, {
                            system: system,
                            user: user,
                            meta: {
                                layer: i.layer,
                                lawVersion: i.lawVersion,
                                personaVersion: i.personaVersion,
                                seed: String(i.seed),
                                promptHash: promptHash,
                                components: {
                                    lawPath: law.path,
                                    personaPath: persona.path,
                                    beliefsCount: i.beliefs.beliefs.length,
                                    excitementCount: i.blueprint.excitement.length,
                                    blueprintThemes: i.blueprint.themes,
                                },
                            },
                        }];
            }
        });
    });
}
/**
 * @deprecated Use assembleChat instead.
 */
function assemblePrompt(i) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, system, user, meta;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, assembleChat(i)];
                case 1:
                    _a = _b.sent(), system = _a.system, user = _a.user, meta = _a.meta;
                    // TODO: Add a deprecation warning log.
                    return [2 /*return*/, {
                            prompt: "".concat(system, "\n\n").concat(user),
                            meta: meta,
                        }];
            }
        });
    });
}
