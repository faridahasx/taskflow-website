import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { tasksSample } from "../../constants/sampleData";
import Tasks from "../../components/Tasks/Tasks";

const mockFn = jest.fn();

test("Tasks snapshot", () => {
  const { asFragment } = render(
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

  expect(asFragment()).toMatchSnapshot("Tasks");
});
