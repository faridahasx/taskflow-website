import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "types/userTypes";

const userSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserSchema>("User", userSchema);
