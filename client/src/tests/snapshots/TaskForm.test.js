import { render } from "@testing-library/react";
import { categoriesSample } from "../../constants/sampleData";
import TaskForm from "../../components/Tasks/TaskForm/TaskForm";

const mockFn = jest.fn();

test("TaskForm snapshot", () => {
  const { asFragment } = render(
    <TaskForm
      handleCloseEditor={mockFn}
      handleSubmit={mockFn}
      handleInputChange={mockFn}
      handleSetStartDate={mockFn}
      handleSetFinishDate={mockFn}
      handleSetDescription={mockFn}
      category=""
      categories={categoriesSample}
      loading={false}
    />
  );

  expect(asFragment()).toMatchSnapshot("TaskForm");
});
