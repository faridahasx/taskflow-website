import { render } from "@testing-library/react";
import { tasksSample } from "constants/sampleData";
import OpenTask from "components/Tasks/OpenTask";

test("OpenTask snapshot", () => {
  const mockFn = jest.fn();
  const { asFragment } = render(
    <OpenTask
      task={tasksSample[0]}
      errorDuringFetch={null}
      openEditTaskEditor={null}
      handleClickEditTask={mockFn}
      handleCloseOpenedTask={mockFn}
      handleTryFetchAgain={mockFn}
    />
  );

  expect(asFragment()).toMatchSnapshot("OpenTask");
});
