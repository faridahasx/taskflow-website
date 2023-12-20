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
const category_1 = __importDefault(require("../models/category"));
const task_1 = __importDefault(require("../models/task"));
const responseMessages_1 = require("../assets/responseMessages");
const router = (0, express_1.Router)();
// ADD
router.post("/", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        // Validate input
        let { title } = req.body;
        if (!title)
            return res.status(400).json(responseMessages_1.missingTitleField);
        // Validate Title
        if (title.toUpperCase() === "ALL")
            return res.status(400).json(responseMessages_1.duplicateTitlesError);
        const category = yield category_1.default.findOne({
            title: title,
            userId: user.userId,
        });
        if (category)
            return res.status(400).json(responseMessages_1.duplicateTitlesError);
        // Validate categories count
        const categoriesCount = yield category_1.default.countDocuments({
            userId: user.userId,
        });
        if (categoriesCount >= 25)
            return res.status(400).json(responseMessages_1.maximumCategoriesReached);
        // Create category
        const newCategory = new category_1.default({ title: title, userId: user.userId });
        yield newCategory.save();
        // Send response
        res.status(201).json(newCategory);
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// GET USER CATEGORIES
router.get("/", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        const total = task_1.default.countDocuments({ userId: user.userId });
        const categories = category_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.default.Types.ObjectId(user.userId),
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
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// EDIT TITLE
router.patch("/:title", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        // Validate input
        let { newTitle } = req.body;
        if (!newTitle)
            return res.status(400).json(responseMessages_1.missingTitleField);
        else if (newTitle == req.params.title)
            return res.status(200).json(responseMessages_1.updateSuccess);
        else if (newTitle.toUpperCase() === "ALL")
            return res.status(400).json(responseMessages_1.duplicateTitlesError);
        const category = yield category_1.default.findOne({
            title: newTitle,
            userId: user.userId,
        });
        if (category) {
            return res.status(400).json(responseMessages_1.duplicateTitlesError);
        }
        const updateCategory = category_1.default.findOneAndUpdate({ title: req.params.title, userId: user.userId }, { title: newTitle });
        const updateTasks = task_1.default.updateMany({ category: req.params.title, userId: user.userId }, { category: newTitle });
        Promise.all([updateCategory, updateTasks]).then(([c, t]) => {
            if (!c)
                return res.status(404).json(responseMessages_1.categoryNotFound);
            res.status(200).json(responseMessages_1.updateSuccess);
        });
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// DELETE
router.delete("/:title", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        const category = yield category_1.default.findOneAndDelete({
            title: req.params.title,
            userId: user.userId,
        });
        if (!category)
            return res.status(404).json(responseMessages_1.categoryNotFound);
        // Update categories field in Tasks
        yield task_1.default.deleteMany({
            category: req.params.title,
            userId: user.userId,
        });
        res.status(200).json(responseMessages_1.deleteSuccess);
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
exports.default = router;
