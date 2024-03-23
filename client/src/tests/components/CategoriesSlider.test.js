import { render, screen } from "test-utilities/test-utils";
import { categoriesSample } from "constants/sampleData";
import CategorieSlider from "components/Categories/CategoriesSlider";
import { mockStore } from "test-utilities/mocks/mockReduxState";
import { clickByTestId } from "test-utilities/user-interaction";

const renderComponent = (
  categories = categoriesSample,
  loading = false,
  errorDuringFetch = null,
  handleTryAgain = jest.fn(),
  categoriesOpen = true,
  setCategoriesOpen = jest.fn()
) => {
  render(
    <CategorieSlider
      categories={categories}
      loading={loading}
      categoriesOpen={categoriesOpen}
      setCategoriesOpen={setCategoriesOpen}
      handleLinkClick={jest.fn()}
      errorDuringFetch={errorDuringFetch}
      handleTryAgain={handleTryAgain}
    />,
    {
      props: { store: mockStore({}) },
    }
  );
};

describe("CategoriesSlider", () => {
  it("renders loading indicator", () => {
    renderComponent(categoriesSample, true);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("renders error indicator", () => {
    renderComponent(categoriesSample, false, true);
    expect(screen.getByTestId("try-again")).toBeInTheDocument();
  });

  it("handles try fetch again", () => {
    const handleTryAgain = jest.fn();
    renderComponent(categoriesSample, false, true, handleTryAgain);
    clickByTestId("try-again");
    expect(handleTryAgain).toHaveBeenCalled();
  });

  it("doesn't render category list items", () => {
    renderComponent(categoriesSample, true);
    expect(screen.queryAllByTestId("category-li")).toHaveLength(0);
  });

  it("renders category list items", () => {
    renderComponent();
    expect(screen.getAllByTestId("category-li")).toHaveLength(
      categoriesSample.length
    );
  });
});
