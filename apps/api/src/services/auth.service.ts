import supabase from "../db/supabase.js";
import HttpError from "../errors/httpError.js";
import { SignUpDTO } from "../types/auth.interface.js";

const authService = {
  async createNewUser(userData: SignUpDTO) {
    const { data, error } = await supabase
      .from("users")
      .insert(userData)
      .select();

    if (error) {
      console.log(error.code);
      throw new HttpError(500, false, error.message);
    }

    return data;
  },
};

export default authService;
