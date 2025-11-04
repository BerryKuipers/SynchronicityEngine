"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDigest = makeDigest;
var crypto_1 = require("crypto");
function makeDigest(obj) {
    var str = JSON.stringify(obj);
    return crypto_1.default.createHash('sha256').update(str).digest('hex').substring(0, 16);
}
