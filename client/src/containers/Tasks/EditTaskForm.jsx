// External imports
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Custom hook
import useAuthRequest from "../../hooks/useAuthRequest";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Context
import { TasksDispatchContext } from "../../context/TaskContext";
// Component
import TaskFormContainer from "./TaskFormContainer";

const EditTaskForm = (props) => {
  // Destructuring props
  const { task, handleCloseEditor } = props;
  // Redux dispatch function
  const dispatch = useDispatch();

  // Accessing tasks dispatch context
  const dispatchTasks = useContext(TasksDispatchContext);
  // Initializing newTask state with task data
  const [newTask, setNewTask] = useState({
    ...task,
    startDate: dayjs(task.startDate),
    finishDate: dayjs(task.finishDate),
  });
  // Custom hook for handling authenticated requests
  const [executeAuthRequest, loadingDescription] = useAuthRequest();

  // Fetch task description on component mount if not already available
  useEffect(() => {
    // Check if description is undefined before fetching
    if (newTask.description === undefined) {
      const fetch_description = async () => {
        const res = await axiosWithCredentials.get(`/task/${task._id}`);
        const description_ = res.data.description;

        // Set description in state and update tasks dispatch context
        setNewTask((prev) => ({ ...prev, description: res.data.description }));
        dispatchTasks({
          type: "edit",
          payload: { _id: task._id, description: description_ },
        });
      };
      // Execute the fetch
      executeAuthRequest(fetch_description);
    }
  }, [dispatchTasks, executeAuthRequest, newTask.description, task]);

  const handleEditTask = async () => {
    await axiosWithCredentials.patch(`/task/${newTask._id}`, newTask);
    // Update category task count in Redux state if it has changed
    if (task.category !== newTask.category) {
      dispatch({
        type: "EDIT_CATEGORY_IN_TASK",
        payload: {
          old_c: task.category,
          new_c: newTask.category,
        },
      });
    }
    // Update task in tasks dispatch context and close the form
    dispatchTasks({ type: "edit", payload: newTask });
    handleCloseEditor();
  };

  return (
    <TaskFormContainer
      handleCloseEditor={handleCloseEditor}
      onSubmit={handleEditTask}
      newTask={newTask}
      setNewTask={setNewTask}
      loadingDescription={loadingDescription}
    />
  );
};

EditTaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  handleCloseEditor: PropTypes.func.isRequired,
};

export default EditTaskForm;
