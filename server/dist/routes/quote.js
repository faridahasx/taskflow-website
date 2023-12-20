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
const quotes_1 = __importDefault(require("../models/quotes"));
const router = (0, express_1.Router)();
// GET THE QUOTE OF THE DAY
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        let quote = yield quotes_1.default.findOne({
            displayDate: {
                $gte: today,
                $lt: tomorrow,
            },
        });
        return res.status(200).json(quote);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
