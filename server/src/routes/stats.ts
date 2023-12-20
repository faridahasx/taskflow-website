import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import auth from "../middleware/authVerify";
import Task from "../models/task";
import { AuthenticatedUser } from "../types";
import { IRequestQuery, getFilters } from "../utils/taskQuery";
import { serverError } from "../assets/responseMessages";

const router = Router();

// GET USERS TASK STATS
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    let user = req.user as AuthenticatedUser;
    let reqQuery = req.query as IRequestQuery;

    const filters = getFilters(
      reqQuery,
      new mongoose.Types.ObjectId(user.userId)
    );

    const stats = await Task.aggregate([
      {
        $match: filters,
      },
      {
        $group: {
          _id: null,
          "Total Tasks": { $sum: 1 },
          Completed: {
            $sum: { $cond: [{ $ne: ["$completedAt", null] }, 1, 0] },
          },
          "Completed Post-Deadline": {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ["$completedAt", "$finishDate"] },
                    { $ne: ["$completedAt", null] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          Incompleted: {
            $sum: { $cond: [{ $eq: ["$completedAt", null] }, 1, 0] },
          },
          Current: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$completedAt", null] },
                    { $lt: ["$startDate", new Date()] },
                    { $gt: ["$finishDate", new Date()] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          Overdue: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$completedAt", null] },
                    { $lt: ["$finishDate", new Date()] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          Upcoming: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$completedAt", null] },
                    { $gt: ["$startDate", new Date()] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          "Total Tasks": "$Total Tasks",
          Completed: "$Completed",
          "Completed Post-Deadline": "$Completed Post-Deadline",
          Incompleted: "$Incompleted",
          Current: "$Current",
          Overdue: "$Overdue",
          Upcoming: "$Upcoming",
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverError);
  }
});

export default router;
