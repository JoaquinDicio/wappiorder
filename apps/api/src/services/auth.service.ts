import supabase from "../db/supabase.js";
import HttpError from "../errors/httpError.js";
import { LoginDTO, SignUpDTO } from "../types/auth.interface.js";

const authService = {
  async signup(userData: SignUpDTO) {

    //TODO -> hash passwords to make it more secure
    //TODO -> not being able to signup if email is already registered

    const { data, error } = await supabase
      .from("users")
      .insert(userData)
      .select();

    if (error) {
      throw new HttpError(500, error.message, error);
    }

    return data;
  },

  async login(loginPayload: LoginDTO) {

    const { data, error } = await supabase
      .from('users')
      .select('email, password')
      .eq('email', loginPayload.email);

    if (error) {
      throw new HttpError(500, error.message, error)
    }

    //valdiates user password and return token
    if (data[0]) {
      const { password } = data[0]
      const isValid = password.trim() === loginPayload.password.trim()
      return isValid ? { token: "tokenfalso" } : null
    }

    // if there is no user we reach this point
    return null
  }


};

export default authService;
