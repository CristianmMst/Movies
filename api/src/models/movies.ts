import { Movie } from "../types";
import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema<Movie>(
  {
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default model("Movie", movieSchema);
