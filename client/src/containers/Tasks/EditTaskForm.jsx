// External imports
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
// Custom Hooks
import useFetchTaskDescription from "hooks/useFetchTaskDesctription";
// Context
import { TasksDispatchContext } from "context/TaskContext";
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
  const { errorDuringFetch, handleTryFetchAgain } = useFetchTaskDescription(
    task._id,
    newTask.description,
    dispatchTasks,
    setNewTask
  );

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
      newTask={newTask}
      errorDuringFetch={errorDuringFetch}
      handleTryFetchAgain={handleTryFetchAgain}
      setNewTask={setNewTask}
      onSubmit={handleEditTask}
      handleCloseEditor={handleCloseEditor}
    />
  );
};

EditTaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  handleCloseEditor: PropTypes.func.isRequired,
};

export default EditTaskForm;
