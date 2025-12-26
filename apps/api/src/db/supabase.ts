import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "";
const public_key = process.env.SUPABASE_PUBLIC_KEY || "";

const supabase = createClient(url, public_key);

export default supabase;
