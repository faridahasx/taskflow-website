import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

export interface ICategory extends Document {
  title: String;
  userId: IUser["_id"];
}

const categorySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Categories", categorySchema);
