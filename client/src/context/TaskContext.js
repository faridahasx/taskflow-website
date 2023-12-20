import { createContext, useReducer } from "react";

// Initial state for tasks
const initialTasks = null;

// Reducer funtion for tasks
const taskReducer = (tasks, action) => {
  switch (action.type) {
    // Action to initialize tasks
    case "initial_fetch": {
      return [...action.payload];
    }
    // Action to fetch more tasks and append to the existing ones
    case "fetch_more": {
      return [...tasks, ...action.payload];
    }
    // Action to add a new task
    case "add": {
      return [...tasks, action.payload];
    }
    // Action to edit an existing task
    case "edit": {
      return tasks.map((t) => {
        if (t._id === action.payload._id) return { ...t, ...action.payload };
        else return t;
      });
    }
    // Action to delete a task
    case "delete": {
      return tasks.filter((t) => t._id !== action.payload);
    }
    // Action to delete the category of tasks
    case "edit_category": {
      return tasks.map((t) => {
        if (t.category === action.payload.oldCategoryTitle)
          return { ...t, category: action.payload.newCategoryTitle };
        else return t;
      });
    }
    // Action to delete tasks based on category
    case "delete_category": {
      return tasks.filter((t) => t.category !== action.payload);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

// Create the context for tasks
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(() => {}); // Default to an empty function

// Provider component for managing tasks state
export function TaskProvider({ children }) {
  // useReducer hook to manage tasks state with the taskReducer
  const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatchTasks}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
