import HttpError from "../errors/httpError.js";

function validateEmailAndPassword(email: string, password: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!emailRegex.test(email)) {
    throw new HttpError(400, "Email inválido");
  }

  if (!passwordRegex.test(password)) {
    throw new HttpError(
      400,
      "La contraseña debe tener al menos 6 caracteres y ser alfanumérica"
    );
  }

  return true;
}

export default validateEmailAndPassword;
