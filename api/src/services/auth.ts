import { User } from "../types";
import userModel from "../models/user";
import { createToken, encrypt, verified } from "../utils/auth";

export const registerNewUser = async ({ username, email, password }: User) => {
  const existUser = await userModel.findOne({ email });
  if (existUser) throw new Error("Usuario ya registrado");
  else {
    const passwordHash = await encrypt(password);
    await userModel.create({
      username,
      email,
      password: passwordHash,
    });
    return "Usuario registrado correctamente";
  }
};

export const LoginUser = async ({ email, password }: User) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Credenciales incorrectas");
  else {
    const isCorrectPassword = await verified(password, user.password);
    if (isCorrectPassword)
      return { username: user.username, token: createToken(user) };
    else {
      throw new Error("Credenciales incorrectas");
    }
  }
};
