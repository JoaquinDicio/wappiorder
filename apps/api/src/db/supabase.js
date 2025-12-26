"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var url = process.env.SUPABASE_URL || "";
var public_key = process.env.PUBLIC_KEY || "";
var supabase = (0, supabase_js_1.createClient)(url, public_key);
exports.default = supabase;
