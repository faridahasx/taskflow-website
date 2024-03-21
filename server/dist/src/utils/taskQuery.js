"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TasksQuery {
  constructor(dbQuery, reqQuery, email) {
    this.dbQuery = dbQuery;
    this.reqQuery = reqQuery;
    this.email = email;
  }
  filtering() {
    const query = { email: this.email };
    const { category, title, completed } = this.reqQuery;
    if (category) query.category = { $in: category.in.split(",") };
    if (completed) query.completed = completed;
    if (title) {
      query.title = {
        $regex: title["regex"].replace(/[.\"\'\`!*-+={}?^$()|[\]\\]/g, ""),
        $options: "i",
      };
    }
    this.dbQuery.find(query);
    return this;
  }
  sorting() {
    if (this.reqQuery.sort) {
      if (this.reqQuery.sort === "createdAt:1") {
        this.dbQuery = this.dbQuery.sort({ createdAt: 1 });
      } else {
        const sortBy = this.reqQuery.sort.split(":");
        let sortField = sortBy[0];
        let sortValue = sortBy[1] * 1;
        this.dbQuery = this.dbQuery.sort({
          [sortField]: sortValue,
          createdAt: -1,
        });
      }
    } else {
      this.dbQuery = this.dbQuery.sort({
        createdAt: -1,
        views: -1,
      });
    }
    return this;
  }
  paginating() {
    const page = this.reqQuery.page * 1 || 1;
    const limit = this.reqQuery.limit * 1 || 13;
    const skip = (page - 1) * 12;
    this.dbQuery = this.dbQuery.skip(skip).limit(limit);
    return this;
  }
}
exports.default = TasksQuery;
