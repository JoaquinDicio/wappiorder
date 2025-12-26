import { Request, Response } from "express";
import authService from "../services/auth.service.js";
import { SignUpDTO } from "../types/auth.interface.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import HttpError from "../errors/httpError.js";

const authController = {

  async createNewUser(req: Request, res: Response) {

    const signupData: SignUpDTO = req.body;

    const REQUIRED: (keyof SignUpDTO)[] = ['password', 'email', 'phone']

    const error = checkMissingFields(REQUIRED, signupData)

    if (Object.keys(error).length > 0) throw new HttpError(400, 'Hay campos faltantes', error)

    // if all the required fields are present, makes the request to db

    const response = await authService.createNewUser(signupData);

    res.status(200).json(response);

  },

};

export default authController;
