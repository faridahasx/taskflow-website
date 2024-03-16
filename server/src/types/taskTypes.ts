import { Document } from "mongoose";
import { IUserSchema } from "./userTypes";
import { ICategorySchema } from "./categoryTypes";

export interface ITaskSchema extends Document {
  userId: IUserSchema["_id"];
  title: String;
  description: String;
  category: ICategorySchema["title"];
  startDate: Date;
  finishDate: Date;
  completedAt: Date;
}

export interface IFetchByCategoryRequestQuery{
  in: string;
}

export interface ISearchRequestQuery {
  regex: string;
}


// IQueryFilter
export interface IFetchTasksFilterQuery {
  userId: IUserSchema["_id"];
  category?: any;
  completedAt?: any;
  startDate?: any;
  finishDate?: any;
  $or?: any;
}


// IRequestQuery
export interface IFetchTasksRequestQuery {
  search?: ISearchRequestQuery;
  category?: IFetchByCategoryRequestQuery;
  sort?: any;
  completed?: "true" | "false";
  started?: "true" | "false";
  finished?: "true" | "false";
  startgte?: string;
  startlte?: string;
  finishgte?: string;
  finishlte?: string;
  startRange?: string;
  endRange?: string;
  page?: string;
  limit?: string;
}
