import { SignUpDTO } from "../types/auth.interface.js";

function normalizeSignupPayload(signupPayload: SignUpDTO): SignUpDTO {
  const { email, phone } = signupPayload;

  return {
    ...signupPayload,
    email: email.trim().toLowerCase(),
    phone: phone?.toString().replace(/\s+/g, ""),
  };
}

export default normalizeSignupPayload;
