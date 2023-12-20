import { Request, Response } from "express";
import {
  categoryNotFound,
  missingFinishDate,
  missingStartDate,
  missingTitleField,
  titleTooLong,
} from "../assets/responseMessages";
import Category from "../models/category";
import { AuthenticatedUser } from "../types";

export const validateTaskInputs = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { title, startDate, finishDate, category } = req.body;
  // Validate title
  if (!title) return res.status(400).json(missingTitleField);
  if (title.length > 200) return res.status(400).json(titleTooLong);

  let user = req.user as AuthenticatedUser;
  // Validate category
  if (category.toUpperCase() !== "ALL") {
    const categoryQuery = await Category.findOne({
      title: category,
      userId: user.userId,
    });
    if (!categoryQuery) return res.status(404).json(categoryNotFound);
  }

  // Validate start and finish dates
  if (!startDate) return res.status(400).json(missingStartDate);
  if (!finishDate) return res.status(400).json(missingFinishDate);
  const startTimestamp = new Date(startDate).getTime();
  const finishTimestamp = new Date(finishDate).getTime();
  if (startTimestamp > finishTimestamp)
    return res.status(400).json("Finish date must be greater than start date.");

  next();
};
