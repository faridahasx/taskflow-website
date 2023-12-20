import {
  getSearchParams,
  getTasksRequestQueryFromURL,
} from "../../utils/tasksURLSearchParamsUtils";

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

describe("getSearchParams", () => {
  it("should return an object with taskID when 'task' is present in the URL", () => {
    Object.defineProperty(window, "location", {
      value: {
        search:
          "?task=123&sort=asc&search=query&startgte=2022-01-01&starlte=2022-01-03",
      },
      writable: true,
    });

    const result = getSearchParams();
    expect(result).toEqual({ taskID: "123" });
  });

  it("should return an object with other parameters when 'task' is not present", () => {
    Object.defineProperty(window, "location", {
      value: {
        search:
          "?sort=asc&search=query&startgte=2023-01-01&startlte=2023-01-03",
      },
      writable: true,
    });
    const result = getSearchParams();
    expect(result).toEqual({
      ...searchParamsReturnObject,
      sort: "asc",
      search: "query",
      startgte: "2023-01-01",
      startlte: "2023-01-03",
    });
  });
  it("should return an object with other parameters when 'task' is not present", () => {
    Object.defineProperty(window, "location", {
      value: {
        search:
          "?sort=asc&tasks=current&search=query&startgte=2023-01-01&startlte=2022-01-05&finishgte=2022-11-31&finishlte=2022-12-31&categories=cat1,cat2&completed=true&started=true&finished=true&active=false",
      },
      writable: true,
    });
    const result = getSearchParams();
    expect(result).toEqual({
      sort: "asc",
      search: "query",
      startgte: "2023-01-01",
      startlte: "2022-01-05",
      finishgte: "2022-11-31",
      finishlte: "2022-12-31",
      category: "cat1,cat2",
      tasks: "current",
    });
  });
});

describe("getRequestQueryFromURL", () => {
  it("should return the query string with taskID when 'task' is present in the URL", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?task=123&sort=date&search=query&startgte=2023-01-01",
      },
      writable: true,
    });

    const result = getTasksRequestQueryFromURL();
    expect(result).toBe("&id=123");
  });

  it("should return the query string based on URL parameters", () => {
    Object.defineProperty(window, "location", {
      value: {
        search:
          "?sort=date&search=query&startgte=2023-01-01&startlte=2023-01-03&categories=cat1,cat2",
      },
      writable: true,
    });

    const result = getTasksRequestQueryFromURL();
    expect(result).toBe(
      "&search[regex]=query&sort=date&category[in]=cat1,cat2&startgte=2023-01-01&startlte=2023-01-03"
    );
  });
});
