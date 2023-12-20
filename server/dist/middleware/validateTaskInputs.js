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
exports.validateTaskInputs = void 0;
const responseMessages_1 = require("../assets/responseMessages");
const category_1 = __importDefault(require("../models/category"));
const validateTaskInputs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, startDate, finishDate, category } = req.body;
    // Validate title
    if (!title)
        return res.status(400).json(responseMessages_1.missingTitleField);
    if (title.length > 200)
        return res.status(400).json(responseMessages_1.titleTooLong);
    let user = req.user;
    // Validate category
    if (category.toUpperCase() !== "ALL") {
        const categoryQuery = yield category_1.default.findOne({
            title: category,
            userId: user.userId,
        });
        if (!categoryQuery)
            return res.status(404).json(responseMessages_1.categoryNotFound);
    }
    // Validate start and finish dates
    if (!startDate)
        return res.status(400).json(responseMessages_1.missingStartDate);
    if (!finishDate)
        return res.status(400).json(responseMessages_1.missingFinishDate);
    const startTimestamp = new Date(startDate).getTime();
    const finishTimestamp = new Date(finishDate).getTime();
    if (startTimestamp > finishTimestamp)
        return res.status(400).json("Finish date must be greater than start date.");
    next();
});
exports.validateTaskInputs = validateTaskInputs;
