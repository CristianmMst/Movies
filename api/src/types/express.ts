import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface JwtPayloadExt extends JwtPayload {
  _id: string;
}

export interface RequestExt extends Request {
  user?: string | JwtPayload;
}
