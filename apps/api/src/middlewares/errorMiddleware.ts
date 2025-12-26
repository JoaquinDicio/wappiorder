import { NextFunction, Request, Response } from "express";
import HttpError from "../errors/httpError.js";

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpError) {
    res.status(error.code).json({ ...error, message: error.message });
  } else {
    res.status(500).json(error);
  }
}

export default errorMiddleware;
