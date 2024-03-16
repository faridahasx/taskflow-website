import { Document } from "mongoose";
import { IUserSchema } from "../types/userTypes";

export interface ICategorySchema extends Document {
  title: String;
  userId: IUserSchema["_id"];
}
