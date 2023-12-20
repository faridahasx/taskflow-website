import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { tasksSample } from "../../../constants/sampleData";
import TaskListItem from "../../../components/Tasks/TaskListItem/TaskListItem";

const { getByTestId, getByTitle } = screen;

const mockTask = tasksSample[0];
const mockFn = jest.fn();
let mockSetOpenTask;
let mockSetExpandDetailsTaskID;
let mockSetOpenEditTaskEditor;

beforeEach(() => {
  mockSetOpenTask = jest.fn();
  mockSetExpandDetailsTaskID = jest.fn();
  mockSetOpenEditTaskEditor = jest.fn();

  act(() => {
    render(
      <TaskListItem
        task={mockTask}
        openEditTaskEditor={{}}
        setOpenEditTaskEditor={mockSetOpenEditTaskEditor}
        openTask={{}}
        setOpenTask={mockSetOpenTask}
        handleToggleCompleted={mockFn}
        handleDelete={mockFn}
        expandDetailsTaskID={mockTask["_id"]}
        setExpandDetailsTaskID={mockSetExpandDetailsTaskID}
      />
    );
  });
});

describe("TaskListItem component", () => {
  it("handles click on open task", () => {
    act(() => {
      fireEvent.click(getByTestId("task-clickable"));
    });
    expect(mockSetOpenTask).toHaveBeenCalledWith(mockTask);
  });

  it("handles click on collapse task details", () => {
    act(() => {
      fireEvent.click(getByTitle("Collapse"));
    });
    expect(mockSetExpandDetailsTaskID).toHaveBeenCalled();
  });

  it("handles click on edit task", () => {
    act(() => {
      fireEvent.click(getByTitle("Edit"));
    });
    expect(mockSetOpenEditTaskEditor).toHaveBeenCalledWith(mockTask);
  });
});
