import { SchemaDefinitionProperty, ObjectId } from "mongoose";

export interface Movie {
  id: string;
  image: string;
  userId: SchemaDefinitionProperty<ObjectId> | undefined;
}
