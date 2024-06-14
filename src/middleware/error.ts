import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utils_class.js";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message,
  });
};
type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const TryCatch = (func: ControllerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};
