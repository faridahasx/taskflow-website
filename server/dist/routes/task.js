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
const authVerify_1 = __importDefault(require("../middleware/authVerify"));
const task_1 = __importDefault(require("../models/task"));
const taskQuery_1 = __importDefault(require("../utils/taskQuery"));
const responseMessages_1 = require("../constants/responseMessages");
const validateTaskInputs_1 = require("../middleware/validateTaskInputs");
const router = (0, express_1.Router)();
// ADD TASK
router.post("/", authVerify_1.default, validateTaskInputs_1.validateTaskInputs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        const newTask = new task_1.default(Object.assign(Object.assign({}, req.body), { userId: user.userId }));
        yield newTask.save();
        res.status(201).json(newTask);
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// GET TASKS - filter, sort, paginate
router.get("/", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        let reqQuery = req.query;
        const { id } = req.query;
        if (id) {
            let data = yield task_1.default.findOne({ _id: id, userId: user.userId });
            res.status(200).json([data]);
        }
        else {
            let query = new taskQuery_1.default(task_1.default.find({}, "-description -userId"), reqQuery, user.userId)
                .filtering()
                .sorting()
                .paginating();
            let data = yield query.dbQuery;
            res.status(200).json(data);
        }
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// GET Task Description by task id
router.get("/:id", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        const taskDescription = yield task_1.default.findOne({ _id: req.params.id, userId: user.userId }, "description");
        if (!taskDescription)
            return res.status(404).json(responseMessages_1.taskNotFound);
        res.status(200).json(taskDescription);
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// EDIT TASK
router.patch("/:id", authVerify_1.default, validateTaskInputs_1.validateTaskInputs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        const task = yield task_1.default.findOneAndUpdate({ _id: req.params.id, userId: user.userId }, {
            $set: req.body,
        }, { new: true });
        if (!task)
            return res.status(404).json(responseMessages_1.taskNotFound);
        res.status(200).json(responseMessages_1.updateSuccess);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// EDIT TASK COMPLETED
router.patch("/completed/:id", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { completedAt } = req.body;
    try {
        let user = req.user;
        const task = yield task_1.default.findOneAndUpdate({ _id: req.params.id, userId: user.userId }, {
            $set: { completedAt: completedAt },
        }, { new: true });
        if (!task)
            return res.status(404).json(responseMessages_1.taskNotFound);
        res.status(200).json(responseMessages_1.updateSuccess);
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
// DELETE TASKS
router.delete("/:id", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        const task = yield task_1.default.findOneAndDelete({
            _id: req.params.id,
            userId: user.userId,
        });
        if (!task)
            return res.status(404).json(responseMessages_1.taskNotFound);
        res.status(200).json(responseMessages_1.deleteSuccess);
    }
    catch (err) {
        return res.status(500).json(responseMessages_1.serverError);
    }
}));
exports.default = router;
