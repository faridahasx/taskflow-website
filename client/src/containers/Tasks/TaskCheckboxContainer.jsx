import { useContext } from "react";
import PropTypes from "prop-types";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
// Custom hooks
import useMakeServerRequest from "hooks/useMakeServerRequest";
// Context
import { TasksDispatchContext } from "context/TaskContext";
// Component
import TaskCheckbox from "components/Tasks/TaskListItem/TaskCheckbox";

const TaskCheckboxContainer = (props) => {
  // Desturcture props
  const { task, checkboxProps } = props;
  // Custom hook for handling authenticated requests
  const { executeServerRequest } = useMakeServerRequest();
  const dispatchTasks = useContext(TasksDispatchContext);

  // Toggle Completed Checkbox
  const handleToggleCompleted = () => {
    const toggleCompleted = async () => {
      let value = null;
      if (!task.completedAt) value = new Date();
      dispatchTasks({
        type: "edit",
        payload: { ...task, completedAt: value },
      });
      await axiosWithCredentials.patch(`task/completed/${task._id}`, {
        completedAt: value,
      });
    };

    executeServerRequest({
      callback: toggleCompleted,
    });
  };

  return (
    <TaskCheckbox
      taskCompleted={task.completedAt}
      checkboxProps={checkboxProps}
      handleToggleCompleted={handleToggleCompleted}
    />
  );
};

TaskCheckboxContainer.propTypes = {
  task: PropTypes.object.isRequired,
  checkboxProps: PropTypes.shape({
    changed: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

export default TaskCheckboxContainer;
