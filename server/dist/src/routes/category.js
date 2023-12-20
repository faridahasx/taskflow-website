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
const category_1 = __importDefault(require("../models/category"));
const task_1 = __importDefault(require("../models/task"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
// ADD
router.post("/", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            let user = req.user;
            const category = new category_1.default(Object.assign(Object.assign({}, req.body), { email: user.email }));
            yield category.save();
            yield user_1.default.findOneAndUpdate({ email: user.email }, {
                $push: { categories: category._id },
            }, { new: true });
            res.status(200).json(category);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// EDIT TITLE
router.patch("/:id", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            let user = req.user;
            const category = yield category_1.default.findById(req.params.id);
            if (!category)
                return res.status(404).json("Category doesn't exist!");
            if (category.email !== user.email)
                return res.status(401).json("Not Authenticated!");
            yield category_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json("Successfully updated the category.");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE
router.delete("/:id", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            let user = req.user;
            const category = yield category_1.default.findById(req.params.id);
            if (!category)
                return res.status(404).json("Category doesn't exist!");
            if (category.email !== user.email)
                return res.status(401).json("Not Authenticated!");
            yield category_1.default.findByIdAndDelete(req.params.id);
            yield task_1.default.deleteMany({ cetegory: req.params.id });
            res.status(200);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
