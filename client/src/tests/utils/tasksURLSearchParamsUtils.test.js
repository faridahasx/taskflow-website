import {
  getSearchParams,
  getTasksRequestQueryFromURL,
} from "utils/tasksURLSearchParamsUtils";

const searchParamsReturnObject = {
  sort: null,
  search: null,
  startgte: null,
  startlte: null,
  finishgte: null,
  finishlte: null,
  category: null,
  tasks: null,
};

const defineSearchProperty = (search) => {
  Object.defineProperty(window, "location", {
    value: {
      search: search,
    },
    writable: true,
  });
};
describe("getSearchParams", () => {
  it("should return an object with taskID when 'task' is present in the URL", () => {
    defineSearchProperty(
      "?task=123&sort=asc&search=query&startgte=2022-01-01&starlte=2022-01-03"
    );
    const result = getSearchParams();
    expect(result).toEqual({ taskID: "123" });
  });

  it("should return an object with other parameters when 'task' is not present", () => {
    defineSearchProperty(
      "?sort=asc&search=query&startgte=2023-01-01&startlte=2023-01-03"
    );
    const result = getSearchParams();
    expect(result).toEqual({
      ...searchParamsReturnObject,
      sort: "asc",
      search: "query",
      startgte: "2023-01-01",
      startlte: "2023-01-03",
    });
  });
});

describe("getRequestQueryFromURL", () => {
  it("should return the query string with taskID when 'task' is present in the URL", () => {
    defineSearchProperty(
      "?task=123&sort=date&search=query&startgte=2023-01-01"
    );

    const result = getTasksRequestQueryFromURL();
    expect(result).toBe("&id=123");
  });

  it("should return the query string based on URL parameters", () => {
    defineSearchProperty(
      "?sort=date&search=query&startgte=2023-01-01&startlte=2023-01-03&categories=cat1,cat2"
    );

    const result = getTasksRequestQueryFromURL();
    expect(result).toBe(
      "&search[regex]=query&sort=date&category[in]=cat1,cat2&startgte=2023-01-01&startlte=2023-01-03"
    );
  });
});
