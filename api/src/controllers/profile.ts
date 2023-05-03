import { Response } from "express";
import { JwtPayloadExt, RequestExt } from "../types";
import * as profileServices from "../services/profile";

export const getUserData = async (req: RequestExt, res: Response) => {
  try {
    const { _id } = req.user as JwtPayloadExt;
    const user = await profileServices.getUserData(_id);
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createMovie = async (req: RequestExt, res: Response) => {
  const movie = req.body;
  try {
    const createMovie = await profileServices.createMovie(movie);
    return res.send(createMovie);
  } catch (err) {
    const error = err as Error;
    return res.status(404).json({ error: error.message });
  }
};

export const deteleMovie = async (req: RequestExt, res: Response) => {
  const { id } = req.params;
  const { _id } = req.user as JwtPayloadExt;
  try {
    const deteleMovie = await profileServices.deleteMovie(id, _id);
    return res.send(deteleMovie);
  } catch (err) {
    const error = err as Error;
    return res.status(404).json({ error: error.message });
  }
};
