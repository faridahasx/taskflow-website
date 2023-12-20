"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStartAndFinishDates = void 0;
const validateStartAndFinishDates = (startDate, finishDate) => {
    const now = new Date().getTime();
    const startTimestamp = new Date(startDate).getTime();
    const finishTimestamp = new Date(finishDate).getTime();
    if (now > finishTimestamp)
        throw new Error("Please select a finish date that is in the future.");
    else if (startTimestamp > finishTimestamp)
        throw new Error("Finish date must be greater than start date.");
};
exports.validateStartAndFinishDates = validateStartAndFinishDates;
