// External imports
import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
// Custom hooks
import useAuthRequest from "../../hooks/useAuthRequest";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
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

  // Custom hook for handling authenticated requests
  const [executeAuthRequest, loading] = useAuthRequest();

  // Accessing the tasks dispatch context
  const dispatchTasks = useContext(TasksDispatchContext);

  // Fetch task description on component mount if not already available
  useEffect(() => {
    const fetch_description = async () => {
      const res = await axiosWithCredentials.get(`/task/${task._id}`);
      const description_ = res.data.description;
      dispatchTasks({
        type: "edit",
        payload: { _id: task._id, description: description_ },
      });
    };
    // Execute fetch only if description is undefined
    task.description === undefined && executeAuthRequest(fetch_description);
  }, [dispatchTasks, executeAuthRequest, task.description, task._id]);

  // Render the OpenTask component
  return (
    <OpenTask
      task={task}
      openEditTaskEditor={openEditTaskEditor}
      handleClickEditTask={handleClickEditTask}
      handleCloseOpenedTask={handleCloseOpenedTask}
      loading={loading}
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
