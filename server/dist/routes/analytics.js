"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const authVerify_1 = __importDefault(require("../middleware/authVerify"));
const task_1 = __importDefault(require("../models/task"));
const taskQuery_1 = require("../utils/taskQuery");
const responseMessages_1 = require("../constants/responseMessages");
const router = (0, express_1.Router)();
// GET USER TASK ANALYTICS
router.get("/", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        let reqQuery = req.query;
        const filters = (0, taskQuery_1.getFilters)(reqQuery, new mongoose_1.default.Types.ObjectId(user.userId));
        const stats = yield task_1.default.aggregate([
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
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
exports.default = router;
