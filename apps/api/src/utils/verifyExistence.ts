import supabase from "../db/supabase.js";
import HttpError from "../errors/httpError.js";

async function verifyExistence(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email.trim());

  if (error) throw new HttpError(500, error.message, error);

  if (data?.length > 0) return true; //meaning user exists

  return false;
}

export default verifyExistence;
