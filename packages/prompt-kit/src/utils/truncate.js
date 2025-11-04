"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateForModel = truncateForModel;
function truncateForModel(system, user, maxTokens) {
    var totalTokens = system.length + user.length; // Simplified token estimation
    if (totalTokens <= maxTokens) {
        return { system: system, user: user };
    }
    var userTokens = Math.floor((user.length / totalTokens) * maxTokens);
    var systemTokens = maxTokens - userTokens;
    return {
        system: system.slice(0, systemTokens),
        user: user.slice(0, userTokens),
    };
}
