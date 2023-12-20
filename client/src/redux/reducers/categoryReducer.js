import ACTIONS from "../actions";

const categories = [{ title: "All", _id: "All", tasks: 0 }];

const categoryReducer = (state = categories, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_CATEGORIES:
      return [...action.payload];

    case ACTIONS.ADD_CATEGORY:
      return [...state, action.payload];

    case ACTIONS.EDIT_CATEGORY:
      return state.map((c) => {
        if (c._id === action.payload._id) return action.payload;
        else return c;
      });

    case ACTIONS.DELETE_CATEGORY:
      return state
        .filter((c) => {
          return c._id !== action.payload._id;
        })
        .map((c) => {
          if (c.title === "All")
            return { ...c, tasks: c.tasks - action.payload.tasks };
          else return c;
        });

    case ACTIONS.TASKS_COUNT:
      return state.map((c) => {
        if ((c.title === action.payload.title) | (c.title === "All"))
          return { ...c, tasks: c.tasks + action.payload.count };
        else return c;
      });
    case ACTIONS.EDIT_CATEGORY_IN_TASK:
      const { old_c, new_c } = action.payload;
      return state.map((c) => {
        if ((old_c === "All") & (c.title === new_c))
          return { ...c, tasks: c.tasks + 1 };
        else if ((new_c === "All") & (c.title === old_c))
          return { ...c, tasks: c.tasks - 1 };
        else if (c.title === old_c && c.title !== "All")
          return { ...c, tasks: c.tasks - 1 };
        else if (c.title === new_c && c.title !== "All")
          return { ...c, tasks: c.tasks + 1 };
        else return c;
      });
    default:
      return state;
  }
};

export default categoryReducer;
