import { useContext } from "react";
import PropTypes from "prop-types";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Custom hooks
import useAuthRequest from "../../hooks/useAuthRequest";
// Context
import { TasksDispatchContext } from "../../context/TaskContext";
// Component
import TaskCheckbox from "../../components/Tasks/TaskListItem/TaskCheckbox";

const TaskCheckboxContainer = (props) => {
  const { task, colorTransition } = props;
  // Custom hook for handling authenticated requests
  const { executeAuthRequest } = useAuthRequest();
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

    executeAuthRequest({
      callback: toggleCompleted,
    });
  };

  return (
    <TaskCheckbox
      taskCompleted={task.completedAt}
      colorTransition={colorTransition}
      handleToggleCompleted={handleToggleCompleted}
    />
  );
};

TaskCheckboxContainer.propTypes = {
  task: PropTypes.object.isRequired,
  colorTransition: PropTypes.shape({
    transition: PropTypes.bool,
    color: PropTypes.string,
  }).isRequired
};

export default TaskCheckboxContainer;
