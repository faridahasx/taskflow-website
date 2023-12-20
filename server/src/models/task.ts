import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./category";
import { IUser } from "./user";

export interface ITask extends Document {
  userId: IUser["_id"];
  title: String;
  description: String;
  category: ICategory["title"];
  startDate: Date;
  finishDate: Date;
  completedAt: Date;
}

const taskSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    startDate: { type: Date },
    finishDate: { type: Date },
    completedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", taskSchema);
