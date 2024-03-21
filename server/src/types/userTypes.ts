import { Document } from "mongoose";

export interface IUserSchema extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  userId: IUserSchema["_id"];
}
