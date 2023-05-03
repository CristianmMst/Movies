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
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ["save", "favorite"],
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default model("Movie", movieSchema);
