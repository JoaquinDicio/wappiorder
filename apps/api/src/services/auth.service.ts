import supabase from "../db/supabase.js";
import HttpError from "../errors/httpError.js";
import bcrypt from 'bcrypt'
import { LoginDTO, SignUpDTO } from "../types/auth.interface.js";
import normalizeSignupPayload from "../utils/normalizeSignupPayload.js";
import validateEmailAndPassword from "../utils/validateEmailAndPassword.js";
import verifyExistence from "../utils/verifyExistence.js";

const authService = {
  async signup(signupPayload: SignUpDTO) {

    const normalizedPayload = normalizeSignupPayload(signupPayload);

    const { email, password } = normalizedPayload;

    validateEmailAndPassword(email, password);

    const existence = await verifyExistence(email);

    if (existence) throw new HttpError(400, "El email ya se encuentra en uso.");

    normalizedPayload.password = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from("users")
      .insert(normalizedPayload)
      .select();

    if (error) {
      throw new HttpError(500, error.message, error);
    }

    return data;
  },

  async login(loginPayload: LoginDTO) {

    //get users from the db
    const { data, error } = await supabase
      .from("users")
      .select("email, password")
      .eq("email", loginPayload.email)
      .single()

    if (error) {
      throw new HttpError(500, error.message, error);
    }

    if (data) {
      const { password } = data;

      const isValid = await bcrypt.compare(loginPayload.password, password)

      return isValid ? { token: "tokenfalso" } : null;
    }

    return null;
  },
};

export default authService;
