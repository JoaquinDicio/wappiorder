import { Request, Response } from "express";
import authService from "../services/auth.service.js";
import { LoginDTO, SignUpDTO } from "../types/auth.interface.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import HttpError from "../errors/httpError.js";

const authController = {

  async signup(req: Request, res: Response) {

    const signupData: SignUpDTO = req.body;

    const REQUIRED: (keyof SignUpDTO)[] = ['password', 'email', 'phone', 'name']

    const error = checkMissingFields(REQUIRED, signupData)

    if (Object.keys(error).length > 0) throw new HttpError(400, 'Hay campos faltantes', error)

    // if all the required fields are present, makes the request to db

    const response = await authService.signup(signupData);

    res.status(200).json(response);

  },

  async login(req: Request, res: Response) {

    const loginData: LoginDTO = req.body

    const REQUIRED: (keyof LoginDTO)[] = ['password', 'email']

    const error = checkMissingFields(REQUIRED, loginData)

    if (Object.keys(error).length > 0) throw new HttpError(400, 'Hay campos faltantes', error)

    const response = await authService.login(loginData) // returns a token if a user matches credentials

    if (!response) throw new HttpError(401, 'Credenciales inválidas')

    res.status(200).json(response)
  }

};

export default authController;
