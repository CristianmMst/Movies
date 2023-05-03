import { SchemaDefinitionProperty, ObjectId } from "mongoose";

export interface Movie {
  id: string;
  image: string;
  type: "saved" | "favorite";
  userId: SchemaDefinitionProperty<ObjectId> | undefined;
}
