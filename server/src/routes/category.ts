import { Request, Response, Router } from "express";
import mongoose from "mongoose";

import auth from "../middleware/authVerify";
import Category from "../models/category";
import Task from "../models/task";
import { AuthenticatedUser } from "../types";
import {
  categoryNotFound,
  deleteSuccess,
  duplicateTitlesError,
  maximumCategoriesReached,
  missingTitleField,
  serverError,
  updateSuccess,
} from "../assets/responseMessages";

const router = Router();

// ADD
router.post("/", auth, async (req: Request, res: Response) => {
  try {
    let user = req.user as AuthenticatedUser;

    // Validate input
    let { title } = req.body;
    if (!title) return res.status(400).json(missingTitleField);

    // Validate Title
    if (title.toUpperCase() === "ALL")
      return res.status(400).json(duplicateTitlesError);
    const category = await Category.findOne({
      title: title,
      userId: user.userId,
    });
    if (category) return res.status(400).json(duplicateTitlesError);

    // Validate categories count
    const categoriesCount = await Category.countDocuments({
      userId: user.userId,
    });
    if (categoriesCount >= 25)
      return res.status(400).json(maximumCategoriesReached);

    // Create category
    const newCategory = new Category({ title: title, userId: user.userId });
    await newCategory.save();

    // Send response
    res.status(201).json(newCategory);
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// GET USER CATEGORIES
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    let user = req.user as AuthenticatedUser;
    const total = Task.countDocuments({ userId: user.userId });
    const categories = Category.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user.userId),
        },
      },

      {
        $lookup: {
          from: "tasks",
          let: {
            categoryTitle: "$title",
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$category", "$$categoryTitle"] },
              },
            },
          ],
          as: "tasksCount",
        },
      },
      {
        $addFields: { tasks: { $size: "$tasksCount" } },
      },
      {
        $project: {
          title: 1,
          _id: 1,
          tasks: 1,
        },
      },
    ]);

    Promise.all([categories, total]).then(([c, t]) => {
      res.status(200).json({ categories: c, totalTasks: t });
    });
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// EDIT TITLE
router.patch("/:title", auth, async (req: Request, res: Response) => {
  try {
    let user = req.user as AuthenticatedUser;
    // Validate input
    let { newTitle } = req.body;
    if (!newTitle) return res.status(400).json(missingTitleField);
    else if (newTitle == req.params.title)
      return res.status(200).json(updateSuccess);
    else if (newTitle.toUpperCase() === "ALL")
      return res.status(400).json(duplicateTitlesError);

    const category = await Category.findOne({
      title: newTitle,
      userId: user.userId,
    });
    if (category) {
      return res.status(400).json(duplicateTitlesError);
    }

    const updateCategory = Category.findOneAndUpdate(
      { title: req.params.title, userId: user.userId },
      { title: newTitle }
    );
    const updateTasks = Task.updateMany(
      { category: req.params.title, userId: user.userId },
      { category: newTitle }
    );

    Promise.all([updateCategory, updateTasks]).then(([c, t]) => {
      if (!c) return res.status(404).json(categoryNotFound);
      res.status(200).json(updateSuccess);
    });
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// DELETE
router.delete("/:title", auth, async (req: Request, res: Response) => {
  try {
    let user = req.user as AuthenticatedUser;

    const category = await Category.findOneAndDelete({
      title: req.params.title,
      userId: user.userId,
    });

    if (!category) return res.status(404).json(categoryNotFound);

    // Update categories field in Tasks
    await Task.deleteMany({
      category: req.params.title,
      userId: user.userId,
    });

    res.status(200).json(deleteSuccess);
  } catch (err) {
    return res.status(500).json(serverError);
  }
});
export default router;
