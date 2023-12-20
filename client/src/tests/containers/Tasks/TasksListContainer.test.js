import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { axiosWithCredentials } from "../../../assets/axiosInstance";
import { TasksDispatchContext } from "../../../context/TaskContext";
import { getTasksRequestQueryFromURL } from "../../../utils/tasksURLSearchParamsUtils";
import { MockIntersectionObserverIntersecting } from "../../mocks/mockClasses";
import { tasksSample } from "../../../constants/sampleData";
import { mockAuthState, mockStore } from "../../mocks/mockReduxState";
import TasksContainer from "../../../containers/Tasks/TasksContainer";

const mockFetchedData = {
  status: 200,
  data: tasksSample,
};
const mockTask = tasksSample[0];

let store;
let mockDispatchTasks;
let queryString;



describe("TasksListContainer", () => {
  beforeEach(() => {
    global.IntersectionObserver = MockIntersectionObserverIntersecting;
    Object.defineProperty(window, "location", {
      value: {
        search: "?startgte=2022-01-01",
      },
      writable: true,
    });

    store = mockStore(mockAuthState);
    mockDispatchTasks = jest.fn();
    queryString = getTasksRequestQueryFromURL();

    render(
        <BrowserRouter>
          <Provider store={store}>
            <TasksDispatchContext.Provider value={mockDispatchTasks}>
              <TasksContainer />
            </TasksDispatchContext.Provider>
          </Provider>
        </BrowserRouter>
      );
    
  });

  it("should make api call with correct query for initial task fetch", async () => {
    axiosWithCredentials.get = jest.fn(() => ({ data: [] }));

    await waitFor(
      () =>
        expect(axiosWithCredentials.get).toHaveBeenCalledWith(
          `task?page=1&limit=9&${queryString}`
        ),
      12000
    );
  });

  it("should dispatch tasks with initial fetch", async () => {
    axiosWithCredentials.get = jest.fn(() => ({ data: [mockTask] }));
    await waitFor(() =>
      expect(mockDispatchTasks).toHaveBeenCalledWith({
        type: "initial_fetch",
        payload: [mockTask],
      })
    );
  });

  it("should not fetch more tasks", async () => {
    axiosWithCredentials.get = jest.fn(() => ({ data: [mockTask] }));
    await waitFor(() => expect(axiosWithCredentials.get).toBeCalledTimes(1));
  });

  it("should make api call with correct queries to fetch more tasks", async () => {
    axiosWithCredentials.get = jest.fn(() => mockFetchedData);
    await waitFor(() =>
      expect(axiosWithCredentials.get).toHaveBeenNthCalledWith(
        1,
        `task?page=1&limit=9&${queryString}`
      )
    );
    await waitFor(() =>
      expect(axiosWithCredentials.get).toHaveBeenNthCalledWith(
        2,
        `task?page=2&limit=9&${queryString}`
      )
    );
    await waitFor(() =>
      expect(mockDispatchTasks).toHaveBeenNthCalledWith(1, {
        type: "initial_fetch",
        payload: tasksSample,
      })
    );
    await waitFor(() =>
      expect(mockDispatchTasks).toHaveBeenNthCalledWith(2, {
        type: "fetch_more",
        payload: tasksSample,
      })
    );
  });
});
