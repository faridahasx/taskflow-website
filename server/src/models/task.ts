import mongoose, { Schema } from "mongoose";
import { ITaskSchema } from "../types/taskTypes";

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
  },
);

export default mongoose.model<ITaskSchema>("Task", taskSchema);
