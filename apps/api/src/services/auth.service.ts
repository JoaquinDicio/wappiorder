import supabase from "../db/supabase.js";
import HttpError from "../errors/httpError.js";
import { LoginDTO, SignUpDTO } from "../types/auth.interface.js";
import normalizeSignupPayload from "../utils/normalizeSignupPayload.js";
import verifyExistence from "../utils/verifyExistence.js";

const authService = {
  async signup(signupPayload: SignUpDTO) {
    //TODO -> hash passwords to make it more secure
    const normalizedPayload = normalizeSignupPayload(signupPayload);
    const { email } = normalizedPayload;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new HttpError(400, "Email inválido");
    }

    const existence = await verifyExistence(email);
    if (existence) throw new HttpError(400, "El email ya se encuentra en uso.");

    //if passed all the validations, atempts to create the user
    const { data, error } = await supabase
      .from("users")
      .insert(signupPayload)
      .select();

    if (error) {
      throw new HttpError(500, error.message, error);
    }

    return data;
  },

  async login(loginPayload: LoginDTO) {
    const { data, error } = await supabase
      .from("users")
      .select("email, password")
      .eq("email", loginPayload.email);

    if (error) {
      throw new HttpError(500, error.message, error);
    }

    //valdiates user password and return token
    if (data[0]) {
      const { password } = data[0];
      const isValid = password.trim() === loginPayload.password.trim();
      return isValid ? { token: "tokenfalso" } : null;
    }

    // if there is no user we reach this point
    return null;
  },
};

export default authService;
