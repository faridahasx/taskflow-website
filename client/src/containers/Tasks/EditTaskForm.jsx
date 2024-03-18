// External imports
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Context
import { TasksDispatchContext } from "../../context/TaskContext";
// Component
import TaskFormContainer from "./TaskFormContainer";
import useFetchTaskDescription from "../../hooks/useFetchTaskDesctription";

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
  const { errorDuringFetch, handleTryFetchAgain } =
    useFetchTaskDescription(
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
      handleCloseEditor={handleCloseEditor}
      onSubmit={handleEditTask}
      newTask={newTask}
      setNewTask={setNewTask}
      handleTryFetchAgain={handleTryFetchAgain}
      errorDuringFetch={errorDuringFetch}
    />
  );
};

EditTaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  handleCloseEditor: PropTypes.func.isRequired,
};

export default EditTaskForm;
