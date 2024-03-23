import { render, screen, waitFor } from "test-utilities/test-utils";
import { axiosWithCredentials } from "utils/axiosInstance";
import { categoriesSample } from "constants/sampleData";
import { mockAuthState, mockStore } from "test-utilities/mocks/mockReduxState";
import CategoriesSliderContainer from "containers/Categories/CategoriesSliderContainer";

const mockFetchedCategories = {
  status: 200,
  data: {
    totalTasks: 9,
    categories: [categoriesSample[1]],
  },
};

const renderComponent = (store = mockStore(mockAuthState)) => {
  render(
    <CategoriesSliderContainer
      categoriesOpen={true}
      setCategoriesOpen={jest.fn()}
    />,
    {
      props: { store: store },
    }
  );
};

describe("CategoriesSliderContainer", () => {
  it("should render categories", async () => {
    let store = mockStore({ ...mockAuthState, categories: categoriesSample });
    renderComponent(store);
    expect(screen.getAllByTestId("category-li")).toHaveLength(
      categoriesSample.length
    );
  });

  it("should fetch and dispatch categories", async () => {
    axiosWithCredentials.get = jest.fn(() => {
      return mockFetchedCategories;
    });
    let store = mockStore(mockAuthState);
    renderComponent(store);
    const actions = store.getActions();
    // Assertions
    await waitFor(() =>
      expect(actions).toEqual([
        {
          payload: [
            {
              _id: "All",
              tasks: mockFetchedCategories.data.totalTasks,
              title: "All",
            },
            ...mockFetchedCategories.data.categories,
          ],
          type: "FETCH_CATEGORIES",
        },
      ])
    );
  });

  it("should render try again button", async () => {
    axiosWithCredentials.get = jest.fn(() => {
      throw Error("");
    });
    renderComponent();
    const element = await screen.findByTestId("try-again");
    expect(element).toBeInTheDocument();
  });
});
