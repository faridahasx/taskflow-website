import { render } from "@testing-library/react";
import { categoriesSample } from "constants/sampleData";
import TaskForm from "components/Tasks/TaskForm/TaskForm";

const mockFn = jest.fn();

test("TaskForm snapshot", () => {
  const { asFragment } = render(
    <TaskForm
      category=""
      categories={categoriesSample}
      loading={false}
      handleTryFetchAgain={mockFn}
      handleInputChange={mockFn}
      handleSetStartDate={mockFn}
      handleSetFinishDate={mockFn}
      handleSetDescription={mockFn}
      handleSubmit={mockFn}
      handleCloseEditor={mockFn}
    />
  );

  expect(asFragment()).toMatchSnapshot("TaskForm");
});
