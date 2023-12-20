import { render, expect, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tasks from "../../../components/Tasks/Tasks";
import { tasksSample } from "../../../constants/sampleData";
const { getByText, queryByTestId } = screen;
const mockFn = jest.fn();

describe("Tasks component", () => {
  describe("value of 'tasks' is empty list", () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <Tasks
            tasks={[]}
            loadingRef={null}
            handleToggleCompleted={mockFn}
            handleDelete={mockFn}
            isTransitioning={false}
            loadMore={false}
          />
        </BrowserRouter>
      );
    });
    it('renders "No tasks"', () => {
      expect(getByText("No tasks")).toBeInTheDocument();
    });
  });
  describe("value of 'tasks' is null", () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <Tasks
            tasks={null}
            loadingRef={null}
            handleToggleCompleted={mockFn}
            handleDelete={mockFn}
            isTransitioning={false}
            loadMore={false}
          />
        </BrowserRouter>
      );
    });
    it("renders initial loading indicator", () => {
      expect(
        queryByTestId("loading-initial-tasks-indicator")
      ).toBeInTheDocument();
    });
  });

  describe("value of 'tasks' is list of tasks ", () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <Tasks
            tasks={tasksSample}
            loadingRef={null}
            handleToggleCompleted={mockFn}
            handleDelete={mockFn}
            isTransitioning={false}
            loadMore={false}
          />
        </BrowserRouter>
      );
    });

    it("renders tasks list items", () => {
      expect(document.getElementsByClassName("task-li")).toHaveLength(
        tasksSample.length
      );
    });

    it("renders transitioning indicator when isTransitioning is true", () => {
      expect(queryByTestId("linear-transiton")).toBeInTheDocument();
      expect(
        queryByTestId("loading-more-tasks-indicator")
      ).not.toBeInTheDocument();
    });

    it("renders loading more tasks indicator when isTransitioning is false and loadMore is true", () => {
      expect(queryByTestId("linear-transiton")).not.toBeInTheDocument();
      expect(queryByTestId("loading-more-tasks-indicator")).toBeInTheDocument();
    });
  });
});
