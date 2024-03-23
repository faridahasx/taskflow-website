import React from "react";
import { render } from "test-utilities/test-utils";
import { clickByTestId, clickByTitle } from "test-utilities/user-interaction";
import { tasksSample } from "constants/sampleData";
import TaskListItem from "components/Tasks/TaskListItem/TaskListItem";
import { mockStore } from "test-utilities/mocks/mockReduxState";

const mockTask = tasksSample[0];
let mockSetOpenTask;
let mockSetExpandDetailsTaskID;
let mockSetOpenEditTaskEditor;

const renderComponent = (expandDetailsTaskID = mockTask["_id"]) => {
  render(
    <TaskListItem
      task={mockTask}
      expandDetailsTaskID={expandDetailsTaskID}
      openEditTaskEditor={null}
      openTask={null}
      setOpenEditTaskEditor={mockSetOpenEditTaskEditor}
      setOpenTask={mockSetOpenTask}
      setExpandDetailsTaskID={mockSetExpandDetailsTaskID}
    />,
    {
      props: { store: mockStore({}) },
    }
  );
};

beforeEach(() => {
  mockSetOpenTask = jest.fn();
  mockSetExpandDetailsTaskID = jest.fn();
  mockSetOpenEditTaskEditor = jest.fn();
});

describe("TaskListItem component", () => {
  it("handles click on open task", () => {
    renderComponent();
    clickByTestId("task-clickable");
    expect(mockSetOpenTask).toHaveBeenCalledWith(mockTask);
  });

  it("handles click on show options", () => {
    renderComponent(null);
    clickByTitle("Show Options");
    expect(mockSetExpandDetailsTaskID).toHaveBeenCalled();
  });
  it("handles click on hide options", () => {
    renderComponent();
    clickByTitle("Hide Options");
    expect(mockSetExpandDetailsTaskID).toHaveBeenCalled();
  });

  it("handles click on edit task", () => {
    renderComponent();
    clickByTitle("Edit");
    expect(mockSetOpenEditTaskEditor).toHaveBeenCalledWith(mockTask);
  });
});
