import { render, screen } from "test-utilities/test-utils";
import Tasks from "components/Tasks/Tasks";
import { tasksSample } from "constants/sampleData";
import { mockStore } from "test-utilities/mocks/mockReduxState";

const renderComponent = (
  tasks,
  isTransitioning = false,
  errorDuringFetch = false,
  loadMore = false,
  handleTryAgain = jest.fn()
) => {
  render(
    <Tasks
      errorDuringFetch={errorDuringFetch}
      isTransitioning={isTransitioning}
      loadMore={loadMore}
      tasks={tasks}
      loadingRef={null}
      handleTryAgain={handleTryAgain}
    />,
    {
      props: { store: mockStore({}) },
    }
  );
};

describe("Tasks component", () => {
  it("renders 'No Task", () => {
    renderComponent([]);
    expect(screen.getByText("No Task")).toBeInTheDocument();
  });
  it("renders initial loading indicator", () => {
    renderComponent(null);
    expect(
      screen.getByTestId("loading-initial-tasks-indicator")
    ).toBeInTheDocument();
  });

  it("renders transitioning and not loadmore indicator", () => {
    renderComponent(tasksSample, true);
    expect(screen.getByTestId("linear-transiton")).toBeInTheDocument();
    expect(
      screen.queryByTestId("loading-more-tasks-indicator")
    ).not.toBeInTheDocument();
  });

  it("renders loadmore and not Transitioning indicator", () => {
    renderComponent(tasksSample, false, false, true);
    expect(screen.queryByTestId("linear-transiton")).not.toBeInTheDocument();
    expect(
      screen.getByTestId("loading-more-tasks-indicator")
    ).toBeInTheDocument();
  });

  it("renders error indicator", () => {
    renderComponent(null, false, true);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders tasks list items", () => {
    renderComponent(tasksSample);
    expect(screen.getAllByTestId("task-li")).toHaveLength(tasksSample.length);
  });
});
