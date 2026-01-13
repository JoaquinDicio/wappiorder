import { NextFunction, Request, Response } from 'express'
import jwt, { decode } from 'jsonwebtoken'
import HttpError from '../errors/httpError.js';

interface JWTPayload {
    userId: string
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const token = req.headers['authorization'];

    if (!token) throw new HttpError(401, "Token invalido. Usuario no autenticado.", { token })

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JWTPayload

        req.user = {
            id: decoded.userId,
        };

    } catch (error) {

        throw new HttpError(401, "Token invalido. Usuario no autenticado.")

    }

    next()
}

export default authMiddleware