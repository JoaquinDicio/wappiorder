import { Request, Response } from "express";
import authService from "../services/auth.service.js";
import { SignUpDTO } from "../types/auth.interface.js";

const authController = {

    async createNewUser(req: Request, res: Response) {
        try {
            const body: SignUpDTO = req.body
            const response = await authService.createNewUser(body)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({ message: "An error ocurred while creating a new user", error })
        }

    }
}

export default authController;