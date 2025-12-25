import { Request, Response } from "express";
import authService from "../services/auth.service.js";
import { SignUpPayload } from "../types/auth.interface.js";

const authController = {

    async createNewUser(req: Request, res: Response) {
        try {
            const body: SignUpPayload = req.body
            const response = await authService.createNewUser(body)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send("An error ocurred while creating a new user")
        }

    }
}

export default authController;