import { Router, Request, Response } from "express";
import auth from "../middleware/authVerify";
import Task from "../models/task";
import TasksQuery, { IRequestQuery } from "../utils/taskQuery";
import { AuthenticatedUser } from "../types";
import {
  deleteSuccess,
  serverError,
  taskNotFound,
  updateSuccess,
} from "../assets/responseMessages";
import { validateTaskInputs } from "../middleware/validateTaskInputs";

const router = Router();

// ADD TASK
router.post(
  "/",
  auth,
  validateTaskInputs,
  async (req: Request, res: Response) => {
    try {
      let user = req.user as AuthenticatedUser;
      const newTask = new Task({ ...req.body, userId: user.userId });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err) {
      return res.status(500).json(serverError);
    }
  }
);

// GET TASKS - filter, sort, paginate
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    let user = req.user as AuthenticatedUser;
    let reqQuery = req.query as IRequestQuery;
    const { id } = req.query;
    if (id) {
      let data = await Task.findOne({ _id: id, userId: user.userId });
      res.status(200).json([data]);
    } else {
      let query = new TasksQuery(
        Task.find({}, "-description -userId"),
        reqQuery,
        user.userId
      )
        .filtering()
        .sorting()
        .paginating();
      let data = await query.dbQuery;
      res.status(200).json(data);
    }
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// GET Task Description by task id
router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    let user = req.user as AuthenticatedUser;
    const taskDescription = await Task.findOne(
      { _id: req.params.id, userId: user.userId },
      "description"
    );
    if (!taskDescription) return res.status(404).json(taskNotFound);
    res.status(200).json(taskDescription);
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// EDIT TASK
router.patch(
  "/:id",
  auth,
  validateTaskInputs,
  async (req: Request, res: Response) => {
    try {
      let user = req.user as AuthenticatedUser;
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: user.userId },
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!task) return res.status(404).json(taskNotFound);
      res.status(200).json(updateSuccess);
    } catch (err) {
      console.log(err);
      return res.status(500).json(serverError);
    }
  }
);

// EDIT TASK COMPLETED
router.patch("/completed/:id", auth, async (req: Request, res: Response) => {
  const { completedAt } = req.body;
  try {
    let user = req.user as AuthenticatedUser;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: user.userId },
      {
        $set: { completedAt: completedAt },
      },
      { new: true }
    );
    if (!task) return res.status(404).json(taskNotFound);
    res.status(200).json(updateSuccess);
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

// DELETE TASKS
router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    let user = req.user as AuthenticatedUser;
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: user.userId,
    });
    if (!task) return res.status(404).json(taskNotFound);
    res.status(200).json(deleteSuccess);
  } catch (err) {
    return res.status(500).json(serverError);
  }
});

export default router;
