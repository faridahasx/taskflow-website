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
const quotesO_1 = __importDefault(require("../../quotes/quotesO"));
const router = (0, express_1.Router)();
// ADD
let add = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentDate = new Date();
    for (let i = 0; i < quotesO_1.default.length; i++) {
        let quote = quotesO_1.default[i];
        try {
            let entry = {
                author: quote[1],
                quote: quote[0],
                displayDate: currentDate,
            };
            const newQuoteEntry = new quotes_1.default(entry);
            yield newQuoteEntry.save();
            console.log(i);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        catch (err) {
            console.log("ADD ERR", err, quote, i);
            return;
        }
    }
});
exports.default = add;
