import { check } from "express-validator";
import { validateResult } from "../utils/auth";
import { NextFunction, Request, Response } from "express";

enum ErrorMessages {
  email = "Correo electrónico invalido",
  required = "Este campo es obligatorio",
  usernameMin = "El nombre de usuario debe tener minimo 3 caracteres",
  usernameMax = "El nombre de usuario debe tener maximo 20 caracteres",
  passwordMin = "La contraseña debe ser mayor a 5 caracteres",
  passwordMax = "La contraseña debe ser menor a 20 caracteres",
}

export const validateSigIn = [
  check("username")
    .exists()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.required)
    .isLength({ min: 5 })
    .withMessage(ErrorMessages.usernameMin)
    .isLength({ max: 20 })
    .withMessage(ErrorMessages.usernameMax),
  check("email").exists().isEmail().withMessage(ErrorMessages.email),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.required)
    .isLength({ min: 5 })
    .withMessage(ErrorMessages.passwordMin)
    .isLength({ max: 20 })
    .withMessage(ErrorMessages.passwordMax),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
