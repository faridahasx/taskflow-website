import mongoose, { Schema } from "mongoose";
import { ICategorySchema } from "types/categoryTypes";

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

export default mongoose.model<ICategorySchema>("Categories", categorySchema);
