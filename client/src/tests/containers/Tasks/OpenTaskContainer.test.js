import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { axiosWithCredentials } from "../../../assets/axiosInstance";
import { mockAuthState, mockStore } from "../../mocks/mockReduxState";
import { TasksDispatchContext } from "../../../context/TaskContext";
import OpenTaskContainer from "../../../containers/Tasks/OpenTaskContainer";

const mockFetchedData = {
  status: 200,
  data: {
    description: "description",
  },
};
const mockTask = { _id: "_id" };
let store;
let mockDispatchTasks;

beforeEach(() => {
  store = mockStore(mockAuthState);
  mockDispatchTasks = jest.fn();
});

describe("OpenTaskContainer", () => {
  describe("should fetch task description", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <TasksDispatchContext.Provider value={mockDispatchTasks}>
            <OpenTaskContainer
              task={mockTask}
              openEditTaskEditor={{}}
              handleClickEditTask={jest.fn()}
              handleCloseOpenedTask={jest.fn()}
            />
          </TasksDispatchContext.Provider>
        </Provider>
      );
    });

    it("should dispatch fetched description data", async () => {
      axiosWithCredentials.get = jest.fn(() => mockFetchedData);

      // Assertions
      await waitFor(() =>
        expect(mockDispatchTasks).toHaveBeenCalledWith({
          type: "edit",
          payload: {
            _id: mockTask._id,
            description: mockFetchedData.data.description,
          },
        })
      );
    });
    it("should not dispatch any data", async () => {
      axiosWithCredentials.get = jest.fn(() => new Error());
      await waitFor(() => expect(mockDispatchTasks).not.toHaveBeenCalled());
    });
  });
  it("should not fetch task description", async () => {
    render(
      <Provider store={store}>
        <TasksDispatchContext.Provider value={mockDispatchTasks}>
          <OpenTaskContainer
            task={{ ...mockTask, description: "" }}
            openEditTaskEditor={{}}
            handleClickEditTask={jest.fn()}
            handleCloseOpenedTask={jest.fn()}
          />
        </TasksDispatchContext.Provider>
      </Provider>
    );

    // Assertions
    await waitFor(() => expect(mockDispatchTasks).not.toHaveBeenCalled());
  });
});
