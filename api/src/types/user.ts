import { Types } from "mongoose";
export interface User {
  email: string;
  username: string;
  password: string;
  _id: Types.ObjectId;
}
