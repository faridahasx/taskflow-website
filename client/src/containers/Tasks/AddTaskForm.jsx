// External imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Utility functions
import { getDateWithNDaysOfDifference } from "../../utils/dateUtils";
// Component
import TaskFormContainer from "./TaskFormContainer";
import getDefaultCategory from "../../utils/getDefaultCategory";

// Default values for a new task
const taskDefaultValues = {
  title: "",
  category: "All",
  description: "",
  startDate: dayjs(getDateWithNDaysOfDifference(1)),
  finishDate: dayjs(getDateWithNDaysOfDifference(2)),
};

const AddTaskForm = (props) => {
  // Destructuring props
  const { handleCloseEditor } = props;

  // Redux dispatch setup
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const isLogged = useSelector((state) => state.auth.isLogged);

  // Initializing newTask state with default values
  const [newTask, setNewTask] = useState({
    ...taskDefaultValues,
    category: isLogged ? getDefaultCategory(categories) : "All",
  });

  //  Function to handle adding a new task
  const handleAddTask = async () => {
    await axiosWithCredentials.post("/task", newTask);
    // Update tasks count in Redux state for the category
    dispatch({
      type: "TASKS_COUNT",
      payload: { title: newTask.category, count: 1 },
    });
    handleCloseEditor();
  };

  // Rendering TaskFormContainer component with necessary props
  return (
    <TaskFormContainer
      handleCloseEditor={handleCloseEditor}
      onSubmit={handleAddTask}
      newTask={newTask}
      setNewTask={setNewTask}
    />
  );
};

AddTaskForm.propTypes = {
  handleCloseEditor: PropTypes.func.isRequired,
};

export default AddTaskForm;
