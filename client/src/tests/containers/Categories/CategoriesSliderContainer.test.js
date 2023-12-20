import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { axiosWithCredentials } from "../../../assets/axiosInstance";
import { categoriesSample } from "../../../constants/sampleData";
import { mockAuthState, mockStore } from "../../mocks/mockReduxState";
import CategoriesSliderContainer from "../../../containers/Categories/CategoriesSliderContainer";



const mockFetchedCategories = {
  status: 200,
  data: {
    totalTasks: 9,
    categories: [categoriesSample[1]],
  },
};

let store;
beforeEach(() => {
  store = mockStore(mockAuthState);
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CategoriesSliderContainer
          categoriesOpen={true}
          setCategoriesOpen={jest.fn()}
        />
      </BrowserRouter>
    </Provider>
  );
});

describe("CategoriesSliderContainer", () => {
  it("should dispatch fetched categories", async () => {
    axiosWithCredentials.get = jest.fn(() => mockFetchedCategories);
    const actions = store.getActions();
    // Assertions
    await waitFor(() =>
      expect(actions).toEqual([
        {
          payload: [
            {
              title: "All",
              tasks: mockFetchedCategories.data.totalTasks,
              _id: "All",
            },
            ...mockFetchedCategories.data.categories,
          ],
          type: "FETCH_CATEGORIES"
        },
      ])
    );
  });
});
