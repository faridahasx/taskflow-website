import { render } from "@testing-library/react";
import { tasksSample } from "../../constants/sampleData";
import OpenTask from "../../components/Tasks/OpenTask";

const mockFn = jest.fn();

test("OpenTask snapshot", () => {
  const { asFragment } = render(
    <OpenTask
      task={tasksSample[0]}
      openEditTaskEditor={{}}
      handleClickEditTask={mockFn}
      handleCloseOpenedTask={mockFn}
      loading={false}
    />
  );

  expect(asFragment()).toMatchSnapshot("OpenTask");
});
