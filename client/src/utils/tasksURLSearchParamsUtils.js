import { formatDate, getDateWithNDaysOfDifference } from "./dateUtils";
import { isValidDate } from "./validateFilters";

// Function to get search parameters from the URL
export const getSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const taskID = searchParams.get("task");
  
  // If there is a taskID return it
  if (taskID) return { taskID };

  // Extract other parameters
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");
  const startgte = searchParams.get("startgte");
  const startlte = searchParams.get("startlte");
  const finishgte = searchParams.get("finishgte");
  const finishlte = searchParams.get("finishlte");
  const category = searchParams.get("categories");
  const tasks = searchParams.get("tasks");

  // Return an object with extracted search parameters
  return {
    sort,
    search,
    startgte,
    startlte,
    finishgte,
    finishlte,
    category,
    tasks,
  };
};

export const formatRequestQuery = (searchParams) => {
  let {
    sort,
    search,
    startgte,
    startlte,
    finishgte,
    finishlte,
    category,
    completed,
    started,
    finished,
    startRange,
    endRange,
  } = searchParams;

  return `${search ? `&search[regex]=${search}` : ``}${
    sort ? `&sort=${sort}` : ``
  }${category && category !== "All" ? `&category[in]=${category}` : ``}${
    completed ? `&completed=${completed}` : ""
  }${started ? `&started=${started}` : ""}${
    finished ? `&finished=${finished}` : ""
  }${isValidDate(startRange) ? `&startRange=${startRange}` : ""}${
    isValidDate(endRange) ? `&endRange=${endRange}` : ""
  }${isValidDate(startgte) ? `&startgte=${startgte}` : ""}${
    isValidDate(startlte) ? `&startlte=${startlte}` : ""
  }${isValidDate(finishgte) ? `&finishgte=${finishgte}` : ""}${
    isValidDate(finishlte) ? `&finishlte=${finishlte}` : ""
  }`;
};

// Function to generate a query string for a request based on search parameters
export const getTasksRequestQueryFromURL = () => {
  const searchParams = getSearchParams();
  const { taskID } = searchParams;
  // If there is a taskID, generate a query string for it
  if (taskID) return `&id=${taskID}`;
  let started = null;
  let finished = null;
  let completed = null;

  let { tasks } = searchParams;

  if (tasks === "current") {
    started = "true";
    completed = "false";
    finished = "false";
  } else if (tasks === "overdue") {
    finished = "true";
    completed = "false";
  } else if (tasks === "upcoming") {
    finished = "false";
    started = "false";
    completed = "false";
  } else if (tasks === "completed") {
    completed = "true";
  }

  // Build a query string based on search parameters
  return formatRequestQuery({
    ...searchParams,
    started: started,
    finished: finished,
    completed: completed,
  });
};

const localeDateStringOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export const getStatsRequestQueryFromURL = () => {
  const searchParams = getSearchParams();

  let { startgte, startlte, finishgte, finishlte } = searchParams;

  let [startRange, endRange] = ["", ""];

  if (!startgte && !startlte && !finishgte && !finishlte) {
    startRange = new Date(
      formatDate(getDateWithNDaysOfDifference(-30))
    ).toLocaleString("en-US", localeDateStringOptions);
    endRange = new Date(
      formatDate(getDateWithNDaysOfDifference(30))
    ).toLocaleString("en-US", localeDateStringOptions);
  }

  return [
    formatRequestQuery({
      ...searchParams,
      startRange: startRange,
      endRange: endRange,
    }),
    startRange,
    endRange,
  ];
};
