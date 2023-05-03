import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI!)
  .then((db) => console.log(`connecting to database: ${db.connection.name}`))
  .catch((err) => console.error(err));
