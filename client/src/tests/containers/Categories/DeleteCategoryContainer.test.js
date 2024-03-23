import { render, waitFor } from "test-utilities/test-utils";
import { axiosWithCredentials } from "utils/axiosInstance";
import { mockAuthState, mockStore } from "test-utilities/mocks/mockReduxState";
import { categoriesSample } from "constants/sampleData";
import { clickByText } from "test-utilities/user-interaction";
import DeleteCategoryContainer from "containers/Categories/DeleteCategoryContainer";
import {
  CATEGORY_DELETED,
  DELETE_CATEGORY_FAILED,
} from "constants/alertMessages";

const mockCategory = categoriesSample[0];
let store;
let mockDispatchTasks;

const renderComponent = (
  category = mockCategory,
  mockHandleCloseDialog = jest.fn()
) => {
  render(
    <DeleteCategoryContainer
      category={category}
      handleCloseDialog={mockHandleCloseDialog}
    />,
    {
      props: { store: store, mockDispatchTasks: mockDispatchTasks },
    }
  );
};

beforeEach(() => {
  store = mockStore(mockAuthState);
  mockDispatchTasks = jest.fn();
  axiosWithCredentials.delete = jest.fn(() => {});
});

describe("DeleteCategoryContainer", () => {
  describe("On success", () => {
    beforeEach(() => {
      axiosWithCredentials.delete = jest.fn(() => {});
    });

    it("should dispatch a delete category action", async () => {
      renderComponent();

      clickByText("Delete");
      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual([
          {
            type: "DELETE_CATEGORY",
            payload: mockCategory,
          },
          { type: "ALERT", payload: CATEGORY_DELETED },
        ])
      );
    });

    it("should dispatch a delete tasks based on category action", async () => {
      renderComponent();
      clickByText("Delete");
      await waitFor(() =>
        expect(mockDispatchTasks).toHaveBeenCalledWith({
          type: "delete_category",
          payload: mockCategory.title,
        })
      );
    });
  });

  describe("On error", () => {
    beforeEach(() => {
      axiosWithCredentials.delete = jest.fn(() => {
        throw Error("Error");
      });
    });

    it("should dispatch an error alert action", async () => {
      renderComponent();
      clickByText("Delete");
      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual([
          { type: "ALERT", payload: DELETE_CATEGORY_FAILED },
        ])
      );
    });
  });
});
