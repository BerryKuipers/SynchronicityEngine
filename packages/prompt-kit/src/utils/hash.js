"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSha256Hash = createSha256Hash;
var crypto_1 = require("crypto");
function createSha256Hash(input) {
    return (0, crypto_1.createHash)('sha256').update(input).digest('hex');
}
