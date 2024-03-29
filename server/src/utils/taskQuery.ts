import {
  IFetchTasksRequestQuery,
  IFetchTasksFilterQuery,
} from "../types/taskTypes";
import { IUserSchema } from "../types/userTypes";

export const getFilters = (
  query: IFetchTasksRequestQuery,
  userId: IUserSchema["_id"]
): IFetchTasksFilterQuery => {
  const {
    category,
    search,
    completed,
    started,
    finished,
    startgte,
    startlte,
    finishgte,
    finishlte,
    startRange,
    endRange,
  } = query;

  const filters: IFetchTasksFilterQuery = { userId: userId };
  if (category) filters.category = { $in: category.in.split(",") };

  if (search) {
    let title = {
      title: {
        $regex: search["regex"].replace(/[.\"\'\`!*-+={}?^$()|[\]\\]/g, ""),
        $options: "i",
      },
    };
    let categorySearch = {
      category: {
        $regex: search["regex"].replace(/[.\"\'\`!*-+={}?^$()|[\]\\]/g, ""),
        $options: "i",
      },
    };
    filters.$or = [title, categorySearch];
  }
  if (startRange && endRange) {
    filters.$or = [
      {
        startDate: {
          $gte: new Date(startRange),
          $lte: new Date(endRange),
        },
      },
      {
        finishDate: {
          $gte: new Date(startRange),
          $lte: new Date(endRange),
        },
      },
    ];
  } else {
    if (completed === "true") filters.completedAt = { $ne: null };
    else if (completed === "false") filters.completedAt = null;

    if (startgte || startlte || started) filters.startDate = {};

    if (startgte) filters.startDate.$gte = new Date(startgte);
    if (startlte) filters.startDate.$lte = new Date(startlte);
    if (started === "true") filters.startDate.$lt = new Date();
    else if (started === "false") filters.startDate.$gt = new Date();

    if (finishgte || finishlte || finished) filters.finishDate = {};

    if (finishgte) filters.finishDate.$gte = new Date(finishgte);
    if (finishlte) filters.finishDate.$lte = new Date(finishlte);
    if (finished === "true") filters.finishDate.$lt = new Date();
    else if (finished === "false") filters.finishDate.$gt = new Date();
  }

  return filters;
};

class TasksQuery {
  dbQuery: any;
  reqQuery: IFetchTasksRequestQuery;
  userId: IUserSchema["_id"];

  constructor(
    dbQuery: any,
    reqQuery: IFetchTasksRequestQuery,
    userId: IUserSchema["_id"]
  ) {
    this.dbQuery = dbQuery;
    this.reqQuery = reqQuery;
    this.userId = userId;
  }

  filtering() {
    const filters = getFilters(this.reqQuery, this.userId);
    this.dbQuery.find(filters);
    return this;
  }

  sorting() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(":");
      let sortField = sortBy[0];
      let sortValue = sortBy[1] * 1;
      this.dbQuery = this.dbQuery.sort({
        [sortField]: sortValue,
      });
    } else {
      this.dbQuery = this.dbQuery.sort({
        startDate: -1,
      });
    }
    return this;
  }

  paginating() {
    const page = Number(this.reqQuery.page) || 1;
    const limit = Number(this.reqQuery.limit) || 12;
    const skip = (page - 1) * limit;
    this.dbQuery = this.dbQuery.skip(skip).limit(limit);
    return this;
  }
}

export default TasksQuery;
