"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var cors_1 = require("cors");
var auth_routes_js_1 = require("./routes/auth.routes.js");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(PORT, function () {
    console.log("Wappiorder is now running at: ".concat(PORT));
});
app.use("/auth", auth_routes_js_1.default);
