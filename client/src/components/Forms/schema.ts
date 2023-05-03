import * as yup from "yup";

enum ErrorMessages {
  email = "Correo electrónico inválido",
  usernameMin = "El nombre de usuario debe tener minimo 3 caracteres",
  usernameMax = "El nombre de usuario debe tener maximo 20 caracteres",
  passwordMin = "La contraseña debe ser mayor a 5 caracteres",
  passwordMax = "La contraseña debe ser menor a 20 caracteres",
  required = "Este campo es obligatorio",
}

// SigIn

export const schemaSignIn = yup.object().shape({
  username: yup
    .string()
    .min(3, ErrorMessages.usernameMin)
    .max(20, ErrorMessages.usernameMax)
    .required(ErrorMessages.required),
  email: yup
    .string()
    .email(ErrorMessages.email)
    .required(ErrorMessages.required),
  password: yup
    .string()
    .min(5, ErrorMessages.passwordMin)
    .max(20, ErrorMessages.passwordMax)
    .required(ErrorMessages.required),
});
export type DataSignIn = yup.InferType<typeof schemaSignIn>;

// Login

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email(ErrorMessages.email)
    .required(ErrorMessages.required),
  password: yup.string().required(ErrorMessages.required),
});
export type DataLogIn = yup.InferType<typeof schemaLogin>;
