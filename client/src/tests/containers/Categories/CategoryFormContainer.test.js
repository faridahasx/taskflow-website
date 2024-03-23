import { render, waitFor } from "test-utilities/test-utils";
import { axiosWithCredentials } from "utils/axiosInstance";
import { categoriesSample } from "constants/sampleData";
import { mockAuthState, mockStore } from "test-utilities/mocks/mockReduxState";
import { changeByTestId, clickByText } from "test-utilities/user-interaction";
import CategoryFormContainer from "containers/Categories/CategoryFormContainer";
import { UNKNOWN_ERROR } from "constants/alertMessages";

const mockCategory = categoriesSample[0];
const successResponse = { status: 200, data: mockCategory };
let store;
let mockDispatchTasks;

const renderComponent = (label, category) => {
  render(
    <CategoryFormContainer
      label={label}
      category={category}
      handleCloseDialog={jest.fn()}
    />,
    {
      props: { store: store, mockDispatchTasks: mockDispatchTasks },
    }
  );
};

beforeEach(() => {
  store = mockStore(mockAuthState);
  mockDispatchTasks = jest.fn();
});

describe("CategoryFormContainer", () => {
  describe("Rename Category", () => {
    beforeEach(() => {
      axiosWithCredentials.patch = jest.fn(() => successResponse);
    });

    it("should dispatch an edit category action", async () => {
      renderComponent("Rename", mockCategory);

      const updatedTitle = "value";
      changeByTestId("category-title-input", "value");
      clickByText("Save");

      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual([
          {
            type: "EDIT_CATEGORY",
            payload: { ...mockCategory, title: updatedTitle },
          },
        ])
      );
    });

    it("should dispatch an edit task category title action", async () => {
      renderComponent("Rename", mockCategory);
      const updatedTitle = "value";
      changeByTestId("category-title-input", updatedTitle);
      clickByText("Save");

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
  describe("Add Category", () => {
    beforeEach(() => {
      axiosWithCredentials.post = jest.fn(() => successResponse);
    });

    it("should dispatch an add category action", async () => {
      renderComponent("Add Category");
      changeByTestId("category-title-input", "value");
      clickByText("Save");
      const actions = store.getActions();

      // Assertions
      await waitFor(() =>
        expect(actions).toEqual([
          {
            type: "ADD_CATEGORY",
            payload: { ...successResponse.data, tasks: 0 },
          },
        ])
      );
    });

    it("should dispatch an unknown error alert", async () => {
      axiosWithCredentials.post = jest.fn(() => {
        throw Error("");
      });
      renderComponent("Add Category");
      changeByTestId("category-title-input", "value");
      clickByText("Save");
      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual([
          {
            type: "ALERT",
            payload: UNKNOWN_ERROR,
          },
        ])
      );
    });
  });
});
