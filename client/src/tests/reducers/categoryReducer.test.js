import { categoriesSample } from "../../constants/sampleData";
import categoryReducer from "../../redux/reducers/categoryReducer";

const defaultCategory = categoriesSample[0];
const userDefinedCategory = categoriesSample[1];

const defaultState = [defaultCategory];

describe("categoryReducer: FETCH_CATEGORIES, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY", () => {
  it("should return initial state ", () => {
    const nextState = categoryReducer(defaultState, {});
    expect(nextState).toHaveLength(1);
  });

  it("should return fetched categories", () => {
    const action = { type: "FETCH_CATEGORIES", payload: categoriesSample };
    const nextState = categoryReducer(defaultState, action);
    expect(nextState).toEqual(categoriesSample);
  });

  it("should add a category", () => {
    const action = { type: "ADD_CATEGORY", payload: userDefinedCategory };
    const nextState = categoryReducer(defaultState, action);
    expect(nextState).toEqual([...defaultState, userDefinedCategory]);
  });

  it("should edit a category", () => {
    const editedCategory = { ...userDefinedCategory, title: "Edited" };

    const action = { type: "EDIT_CATEGORY", payload: editedCategory };
    const nextState = categoryReducer(categoriesSample, action);

    expect(nextState).toEqual([defaultCategory, editedCategory]);
  });

  it("should delete a category", () => {
    const action = { type: "DELETE_CATEGORY", payload: userDefinedCategory };
    const nextState = categoryReducer(categoriesSample, action);
    expect(nextState).toEqual([
      {
        ...defaultCategory,
        tasks: defaultCategory.tasks - userDefinedCategory.tasks,
      },
    ]);
  });
});

describe("categoryReducer: TASKS_COUNT", () => {
  it("should only increment All Tasks' tasks count", () => {
    const action = {
      type: "TASKS_COUNT",
      payload: { title: defaultCategory.title, count: 1 },
    };

    const nextState = categoryReducer(categoriesSample, action);
    expect(nextState).toEqual([
      { ...defaultCategory, tasks: defaultCategory.tasks + 1 },
      userDefinedCategory,
    ]);
  });

  it("should increment All Tasks' and a category's tasks count", () => {
    const action = {
      type: "TASKS_COUNT",
      payload: { title: userDefinedCategory.title, count: 1 },
    };

    const nextState = categoryReducer(categoriesSample, action);
    expect(nextState).toEqual([
      { ...defaultCategory, tasks: defaultCategory.tasks + 1 },
      { ...userDefinedCategory, tasks: userDefinedCategory.tasks + 1 },
    ]);
  });

  it("should only decrement All' tasks count", () => {
    const action = {
      type: "TASKS_COUNT",
      payload: { title: defaultCategory.title, count: -1 },
    };
    const nextState = categoryReducer(categoriesSample, action);
    expect(nextState).toEqual([
      { ...defaultCategory, tasks: defaultCategory.tasks - 1 },
      userDefinedCategory,
    ]);
  });

  it("should decrement All Tasks' and a category's tasks count", () => {
    const action = {
      type: "TASKS_COUNT",
      payload: { title: userDefinedCategory.title, count: -1 },
    };
    const nextState = categoryReducer(categoriesSample, action);
    expect(nextState).toEqual([
      { ...defaultCategory, tasks: defaultCategory.tasks - 1 },
      { ...userDefinedCategory, tasks: userDefinedCategory.tasks - 1 },
    ]);
  });
});

describe("categoryReducer: EDIT_CATEGORY_IN_TASK", () => {
  it("should increment category's tasks count", () => {
    const action = {
      type: "EDIT_CATEGORY_IN_TASK",
      payload: {
        old_c: defaultCategory.title,
        new_c: userDefinedCategory.title,
      },
    };

    const nextState = categoryReducer(categoriesSample, action);
    expect(nextState).toEqual([
      defaultCategory,
      { ...userDefinedCategory, tasks: userDefinedCategory.tasks + 1 },
    ]);
  });

  it("should decrement category's tasks count", () => {
    const action = {
      type: "EDIT_CATEGORY_IN_TASK",
      payload: {
        old_c: userDefinedCategory.title,
        new_c: defaultCategory.title,
      },
    };

    const nextState = categoryReducer(categoriesSample, action);
    expect(nextState).toEqual([
      defaultCategory,
      { ...userDefinedCategory, tasks: userDefinedCategory.tasks - 1 },
    ]);
  });

  it("should add one task from category to another", () => {
    const anotherCategory = {
      _id: "Tasks2",
      title: "Tasks2",
      tasks: 5,
    };

    const action = {
      type: "EDIT_CATEGORY_IN_TASK",
      payload: {
        old_c: userDefinedCategory.title,
        new_c: anotherCategory.title,
      },
    };

    const nextState = categoryReducer(
      [...categoriesSample, anotherCategory],
      action
    );
    expect(nextState).toEqual([
      defaultCategory,
      { ...userDefinedCategory, tasks: userDefinedCategory.tasks - 1 },
      { ...anotherCategory, tasks: anotherCategory.tasks + 1 },
    ]);
  });
});
