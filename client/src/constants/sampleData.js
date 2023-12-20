import { getDateWithNDaysOfDifference } from "../utils/dateUtils";

const categoriesSample = [
  {
    title: "All",
    tasks: 5,
    _id: "All",
  },
  {
    _id: "Tasks",
    tasks: 5,
    title: "Tasks",
  },
];

let tasksSample = [
  {
    _id: "1",
    title: "Task 1",
    category: "Tasks",
    description: "",
    startDate: getDateWithNDaysOfDifference(-1),
    finishDate: getDateWithNDaysOfDifference(1),
    completedAt: null,
    createdAt: getDateWithNDaysOfDifference(-4),
    updatedAt: getDateWithNDaysOfDifference(-4),
    __v: 0,
  },
  {
    _id: "2",
    title: "Task 2",
    category: "Tasks",
    description: "",
    startDate: getDateWithNDaysOfDifference(-2),
    finishDate: getDateWithNDaysOfDifference(-1),
    completedAt: null,
    createdAt: getDateWithNDaysOfDifference(-4),
    updatedAt: getDateWithNDaysOfDifference(-4),
    __v: 0,
  },
  {
    _id: "3",
    title: "Task 3",
    category: "Tasks",
    description: "",
    startDate: getDateWithNDaysOfDifference(2),
    finishDate: getDateWithNDaysOfDifference(3),
    completedAt: null,
    createdAt: getDateWithNDaysOfDifference(-4),
    updatedAt: getDateWithNDaysOfDifference(-4),
    __v: 0,
  },

  {
    _id: "4",
    title: "Task 4",
    category: "Tasks",
    description: "",
    startDate: getDateWithNDaysOfDifference(2),
    finishDate: getDateWithNDaysOfDifference(4),
    completedAt: getDateWithNDaysOfDifference(3),
    createdAt: getDateWithNDaysOfDifference(-4),
    updatedAt: getDateWithNDaysOfDifference(-4),
    __v: 0,
  },
  {
    _id: "5",
    title: "Login to continue",
    category: "Tasks",
    description: "",
    startDate: getDateWithNDaysOfDifference(-1),
    finishDate: getDateWithNDaysOfDifference(1),
    completedAt: null,
    createdAt: getDateWithNDaysOfDifference(-4),
    updatedAt: getDateWithNDaysOfDifference(-4),
    __v: 0,
  },
];

export { tasksSample, categoriesSample };
