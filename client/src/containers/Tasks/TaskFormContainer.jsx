// External imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// Custom hooks
import useAuthRequest from "../../hooks/useAuthRequest";
// Component
import TaskForm from "../../components/Tasks/TaskForm/TaskForm";
import { categoriesSample } from "../../constants/sampleData";

const TaskFormContainer = (props) => {
  // Destructuring props
  const {
    handleCloseEditor,
    onSubmit,
    newTask,
    setNewTask,
    loadingDescription,
  } = props;

  // Redux dispatch function
  const dispatch = useDispatch();
  // Access the state from Redux store
  const isLogged = useSelector((state) => state.auth.isLogged);

  const categories = useSelector((state) => state.categories);

  // Custom hook for handling authenticated requests
  const [executeAuthRequest, loading] = useAuthRequest();

  // Destructuring task properties for easier access
  const { title, category, startDate, finishDate, description } = newTask;
  // State to track whether the form has been saved
  const [saved, setSaved] = useState(true);

  // Handle input change in the form
  const handleInputChange = (e) => {
    e.preventDefault();
    // Update the corresponding property in newTask and mark as unsaved
    setNewTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    saved && setSaved(false);
  };

  // State to track initial render
  const [initialRender, setInitialRender] = useState(true);

  // Handlers for setting description, start date, and finish date
  const handleSetDescription = (data) => {
    // Set description in state and mark as unsaved
    setNewTask((prev) => ({ ...prev, description: data }));
    initialRender
      ? setInitialRender(false)
      : (description !== data) & saved && setSaved(false);
  };

  const handleSetStartDate = (data) => {
    // Set start date in state and mark as unsaved

    setNewTask((prev) => ({ ...prev, startDate: data }));
    saved && setSaved(false);
  };

  const handleSetFinishDate = (data) => {
    // Set finish date in state and mark as unsaved

    setNewTask((prev) => ({ ...prev, finishDate: data }));
    saved && setSaved(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      // Dispatch an alert if title is missing
      dispatch({ type: "ALERT", payload: "Please fill in the title field" });
    } else {
      // Execute the server request
      await executeAuthRequest(onSubmit, "Saved");
    }
  };

  // Render the TaskForm component
  return (
    <TaskForm
      handleCloseEditor={handleCloseEditor}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      title={title}
      category={category}
      startDate={startDate}
      handleSetStartDate={handleSetStartDate}
      finishDate={finishDate}
      handleSetFinishDate={handleSetFinishDate}
      description={description}
      handleSetDescription={handleSetDescription}
      loading={loadingDescription || loading}
      saved={saved}
      categories={isLogged ? categories : categoriesSample}
    />
  );
};

TaskFormContainer.propTypes = {
  handleCloseEditor: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setNewTask: PropTypes.func.isRequired,
  newTask: PropTypes.object.isRequired,
  loadingDescription: PropTypes.bool,
};

export default TaskFormContainer;
