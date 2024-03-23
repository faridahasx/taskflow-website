import { render, screen } from "test-utilities/test-utils";
import { useNavigate } from "react-router-dom";
import mockInitialState, {
  mockStore,
} from "test-utilities/mocks/mockReduxState";
import { clickByTestId, clickByTitle } from "test-utilities/user-interaction";
import Layout from "components/Layout/Layout";

const renderComponent = (mockNavigate = jest.fn()) => {
  useNavigate.mockReturnValue(mockNavigate);
  const store = mockStore(mockInitialState);
  render(<Layout children={null} />, {
    props: { store: store },
  });
};

describe("Layout", () => {
  it("handles clicks on toggle open categories", () => {
    renderComponent();
    expect(screen.getByTestId("categories")).not.toHaveClass(
      "categories-slider-open"
    );

    clickByTitle("Open Categories");
    expect(screen.getByTestId("categories")).toHaveClass(
      "categories-slider-open"
    );
    clickByTitle("Close Categories");

    expect(screen.getByTestId("categories")).not.toHaveClass(
      "categories-slider-open"
    );
  });

  it("closes categories slider when navigating", () => {
    renderComponent();
    clickByTitle("Open Categories");
    expect(screen.getByTestId("categories")).toHaveClass(
      "categories-slider-open"
    );
    clickByTestId("header-home-link");
    expect(screen.getByTestId("categories")).not.toHaveClass(
      "categories-slider-open"
    );
  });

  it("handles click on logo", () => {
    const mockNavigate = jest.fn();
    renderComponent(mockNavigate);

    clickByTestId("header-home-link");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles click on analytics link", () => {
    const mockNavigate = jest.fn();
    renderComponent(mockNavigate);
    clickByTestId("header-analytics-link");
    expect(mockNavigate).toHaveBeenCalledWith("/analytics");
  });
});
