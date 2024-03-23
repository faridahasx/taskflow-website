import { render, screen } from "test-utilities/test-utils";
import { clickByTestId, clickByTitle } from "test-utilities/user-interaction";
import { MockIntersectionObserver } from "test-utilities/mocks/mockClasses";
import { mockStore } from "test-utilities/mocks/mockReduxState";
import Navigation from "components/Navigation/Navigation";
import { categoriesSample } from "constants/sampleData";

const renderComponent = (handleToggleOpenTaskForm = jest.fn()) => {
  render(<Navigation handleToggleOpenTaskForm={handleToggleOpenTaskForm} />, {
    props: { store: mockStore({ categories: categoriesSample }) },
  });
};

beforeEach(() => {
  global.IntersectionObserver = MockIntersectionObserver;
});

describe("Navigation", () => {
  // it("handles open Sort", async () => {
  //   renderComponent();
  //   expect(screen.queryByTestId("sort")).not.toBeInTheDocument();
  //   clickByTitle("Sort");
  //   const element = await screen.findByTestId("sort", {}, { timeout: 7000 });

  //   expect(element).toBeInTheDocument();
  // });

  it("handles open Search", async () => {
    renderComponent();
    expect(screen.queryByTestId("search")).not.toBeInTheDocument();
    clickByTitle("Search");
    const element = await screen.findByTestId("search", {}, { timeout: 7000 });
    expect(element).toBeInTheDocument();
  });

  // it("handles open Filters", async () => {
  //   renderComponent();
  //   expect(screen.queryByTestId("filters")).not.toBeInTheDocument();
  //   clickByTitle("Filters");
  //   const element = await screen.findByTestId("filters", {}, { timeout: 7000 });
  //   expect(element).toBeInTheDocument();
  // });

  it("handles open Add Task Form", async () => {
    const handleToggleOpenTaskForm = jest.fn();
    renderComponent(handleToggleOpenTaskForm);
    clickByTestId("add-task-btn");
    expect(handleToggleOpenTaskForm).toHaveBeenCalled();
  });
});
