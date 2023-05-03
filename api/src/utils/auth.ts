import jwt from "jsonwebtoken";
import { User } from "../types";
import { compare, hash } from "bcryptjs";
import { validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";

export const createToken = ({ _id }: User) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!);
};

export const verifyToken = (token: string) => {
  const isCorrect = jwt.verify(token, process.env.JWT_SECRET!);
  return isCorrect;
};

export const encrypt = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

export const verified = async (password: string, passwordHash: string) => {
  const isCorrect = await compare(password, passwordHash!);
  return isCorrect;
};

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err: any) {
    res.status(403).send({ error: err.array() });
  }
};
