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
Object.defineProperty(exports, "__esModule", { value: true });
exports.redactSpan = redactSpan;
function redact(obj, maxLength) {
    if (maxLength === void 0) { maxLength = 256; }
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (typeof obj === 'string') {
        if (obj.length > maxLength) {
            return obj.substring(0, maxLength) + '...[truncated]';
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(function (item) { return redact(item, maxLength); });
    }
    if (typeof obj === 'object') {
        var newObj = {};
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = redact(obj[key], maxLength);
            }
        }
        return newObj;
    }
    return obj;
}
function redactSpan(span) {
    if (span.outputs && span.outputs.event) {
        return __assign(__assign({}, span), { outputs: __assign(__assign({}, span.outputs), { event: redact(span.outputs.event) }) });
    }
    return span;
}
