"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var MainPage_1 = require("./components/MainPage");
var PromptPlaygroundPage_1 = require("./components/PromptPlaygroundPage");
var TraceViewerPage_1 = require("./components/TraceViewerPage");
var App = function () {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<MainPage_1.MainPage />}/>
        <react_router_dom_1.Route path="/trace/:traceId" element={<TraceViewerPage_1.TraceViewerPage />}/>
        <react_router_dom_1.Route path="/playground" element={<PromptPlaygroundPage_1.PromptPlaygroundPage />}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
