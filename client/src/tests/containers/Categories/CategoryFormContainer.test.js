import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { axiosWithCredentials } from "../../../assets/axiosInstance";
import { TasksDispatchContext } from "../../../context/TaskContext";
import { categoriesSample } from "../../../constants/sampleData";
import { mockAuthState, mockStore } from "../../mocks/mockReduxState";
import { changeByLabelText, clickByText } from "../../../testUtilities";
import CategoryFormContainer from "../../../containers/Categories/CategoryFormContainer";

const mockCategory = categoriesSample[0];
const successResponse = { status: 200, data: mockCategory };

let mockHandleCloseDialog;
let store;

beforeEach(() => {
  store = mockStore(mockAuthState);
  mockHandleCloseDialog = jest.fn();
});

describe("CategoryFormContainer", () => {
  it("should handle add mode", async () => {
    axiosWithCredentials.post = jest.fn(() => successResponse);

    // Render the component
    render(
      <Provider store={store}>
        <CategoryFormContainer
          label="Add category"
          handleCloseDialog={mockHandleCloseDialog}
        />
      </Provider>
    );
    changeByLabelText("Add category", "input value");
    clickByText("Save");
    const actions = store.getActions();

    // Assertions
    await waitFor(() =>
      expect(actions).toEqual([
        {
          type: "ADD_CATEGORY",
          payload: { ...successResponse.data, tasks: 0 },
        },
        { type: "ALERT", payload: "Saved" },
      ])
    );
    await waitFor(() => expect(mockHandleCloseDialog).toHaveBeenCalledTimes(1));
  });

  it("should handle edit mode", async () => {
    // Context
    const mockDispatchTasks = jest.fn();
    //
    axiosWithCredentials.patch = jest.fn(() => successResponse);

    // Render the component
    render(
      <Provider store={store}>
        <TasksDispatchContext.Provider value={mockDispatchTasks}>
          <CategoryFormContainer
            label="Rename"
            category={mockCategory}
            handleCloseDialog={mockHandleCloseDialog}
          />
        </TasksDispatchContext.Provider>
      </Provider>
    );
    const updatedTitle = "updated title"
    changeByLabelText("Rename", updatedTitle);
    clickByText("Save");

    const actions = store.getActions();

    // Assertions
    await waitFor(() =>
      expect(actions).toEqual([
        {
          type: "EDIT_CATEGORY",
          payload: { ...mockCategory, title: updatedTitle },
        },
        { type: "ALERT", payload: "Saved" },
      ])
    );
    await waitFor(() => expect(mockHandleCloseDialog).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockDispatchTasks).toHaveBeenCalledWith({
        type: "edit_category",
        payload: {
          oldCategoryTitle: mockCategory.title,
          newCategoryTitle: updatedTitle,
        },
      })
    );
  });
});
