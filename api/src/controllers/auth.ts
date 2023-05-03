import { Request, Response } from "express";
import * as userServices from "../services/auth";

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await userServices.registerNewUser(user);
    return res.send({ success: newUser });
  } catch (error: any) {
    return res.status(401).send({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userLogin = await userServices.LoginUser(user);
    return res.json(userLogin);
  } catch (error: any) {
    return res.status(401).send({ error: error.message });
  }
};
