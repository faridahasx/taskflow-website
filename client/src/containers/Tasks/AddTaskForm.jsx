// External imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
import { getDateWithNDaysOfDifference } from "utils/dateUtils";
import getDafultCategoryFromSearchParams from "utils/getDafultCategoryFromSearchParams";
// Component
import TaskFormContainer from "./TaskFormContainer";

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

  // Initializing newTask state with default values
  const [newTask, setNewTask] = useState({
    ...taskDefaultValues,
    category: getDafultCategoryFromSearchParams(categories),
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
      newTask={newTask}
      setNewTask={setNewTask}
      onSubmit={handleAddTask}
      handleCloseEditor={handleCloseEditor}
    />
  );
};

AddTaskForm.propTypes = {
  handleCloseEditor: PropTypes.func.isRequired,
};

export default AddTaskForm;
