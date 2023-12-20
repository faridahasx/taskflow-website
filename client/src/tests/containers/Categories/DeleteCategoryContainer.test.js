import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { axiosWithCredentials } from "../../../assets/axiosInstance";
import { TasksDispatchContext } from "../../../context/TaskContext";
import { mockAuthState, mockStore } from "../../mocks/mockReduxState";
import { categoriesSample } from "../../../constants/sampleData";
import { clickByText } from "../../../testUtilities";
import DeleteCategoryContainer from "../../../containers/Categories/DeleteCategoryContainer";

const mockCategory = categoriesSample[0];

describe("DeleteCategoryContainer", () => {
  it("should handle successfull delete", async () => {
    const mockDispatchTasks = jest.fn();
    const mockHandleCloseDialog = jest.fn();
    const store = mockStore(mockAuthState);
    axiosWithCredentials.delete = jest.fn(() => {});

    // Render the component
    render(
      <Provider store={store}>
        <TasksDispatchContext.Provider value={mockDispatchTasks}>
          <DeleteCategoryContainer
            category={mockCategory}
            handleCloseDialog={mockHandleCloseDialog}
          />
        </TasksDispatchContext.Provider>
      </Provider>
    );
    clickByText("Delete");
    const actions = store.getActions();

    // Assertions
    await waitFor(() =>
      expect(actions).toEqual([
        {
          type: "DELETE_CATEGORY",
          payload: mockCategory,
        },
        { type: "ALERT", payload: "Category deleted" },
      ])
    );
    await waitFor(() => expect(mockHandleCloseDialog).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockDispatchTasks).toHaveBeenCalledWith({
        type: "delete_category",
        payload: mockCategory.title,
      })
    );
  });
});
