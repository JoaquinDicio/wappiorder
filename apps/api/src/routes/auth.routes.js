"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_js_1 = require("../controllers/auth.controller.js");
var authRouter = (0, express_1.Router)();
authRouter.post("/signup", auth_controller_js_1.default.createNewUser);
exports.default = authRouter;
