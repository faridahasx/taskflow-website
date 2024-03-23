import { render } from "@testing-library/react";
import { TasksDispatchContext } from "context/TaskContext";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const customRender = (ui, { props, ...options } = {}) => {
  const { store, mockDispatchTasks } = props;

  const AllTheProviders = ({ children }) => (
    <Provider store={store}>
      <TasksDispatchContext.Provider value={mockDispatchTasks}>
        <BrowserRouter>{children}</BrowserRouter>
      </TasksDispatchContext.Provider>
    </Provider>
  );

  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";
// export * from "@testing-library/jest-dom";
export { customRender as render };
