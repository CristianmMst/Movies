import userModel from "../models/user";
import movieModel from "../models/movies";
import { Types } from "mongoose";
import { Movie } from "../types";

export const getUserData = async (id: string) => {
  const user = await userModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "userId",
        as: "movies",
      },
    },
    {
      $project: {
        password: 0,
        "movies.userId": 0,
      },
    },
  ]);
  return user[0];
};

export const createMovie = async (movie: Movie) => {
  const movieExistsOnUser = await movieModel.findOne({
    id: movie.id,
    userId: movie.userId,
  });

  if (!movieExistsOnUser) return await movieModel.create(movie);
  else throw new Error("Esta pelicula ya existe");
};

export const deleteMovie = async (id: string, _id: string) => {
  const deleteMovie = await movieModel.findByIdAndDelete(id);
  return deleteMovie;
};

export const changeUsername = async (id: string, username: string) => {
  const user = await userModel.findByIdAndUpdate(id, {
    username: username,
  });
  return user;
};
