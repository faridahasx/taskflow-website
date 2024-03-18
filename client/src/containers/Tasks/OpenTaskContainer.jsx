// External imports
import { useContext } from "react";
import PropTypes from "prop-types";
// Custom hooks
import useFetchTaskDescription from "../../hooks/useFetchTaskDesctription";
// Context
import { TasksDispatchContext } from "../../context/TaskContext";
// Component
import OpenTask from "../../components/Tasks/OpenTask";

const OpenTaskContainer = (props) => {
  // Destructuring props
  const {
    task,
    openEditTaskEditor,
    handleClickEditTask,
    handleCloseOpenedTask,
  } = props;
  // Accessing the tasks dispatch context
  const dispatchTasks = useContext(TasksDispatchContext);
  // Fetch task description on component mount if not already available

  const { errorDuringFetch, handleTryFetchAgain } =
    useFetchTaskDescription(task._id, task.description, dispatchTasks);

  // Render the OpenTask component
  return (
    <OpenTask
      task={task}
      openEditTaskEditor={openEditTaskEditor}
      handleClickEditTask={handleClickEditTask}
      handleCloseOpenedTask={handleCloseOpenedTask}
      errorDuringFetch={errorDuringFetch}
      handleTryFetchAgain={handleTryFetchAgain}
    />
  );
};

OpenTaskContainer.propTypes = {
  task: PropTypes.object.isRequired,
  openEditTaskEditor: PropTypes.object.isRequired,
  handleClickEditTask: PropTypes.func.isRequired,
  handleCloseOpenedTask: PropTypes.func.isRequired,
};

export default OpenTaskContainer;
