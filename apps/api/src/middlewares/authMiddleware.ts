import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import HttpError from '../errors/httpError.js';

function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const token = req.headers['authorization'];

    if (!token) throw new HttpError(401, "Token invalido. Usuario no autenticado.", { token })

    try {

        jwt.verify(token, process.env.JWT_SECRET || "secret")

    } catch (error) {

        throw new HttpError(401, "Token invalido. Usuario no autenticado.")

    }

    next()
}

export default authMiddleware