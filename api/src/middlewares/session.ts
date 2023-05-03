import { RequestExt } from "../types";
import { verifyToken } from "../utils/auth";
import { NextFunction, Response } from "express";

export const checkSession = (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization || null;
    const userLogged = verifyToken(`${token}`);
    req.user = userLogged;
    next();
  } catch (error) {
    res.status(400).send({ error: "Sesión no valida" });
  }
};
