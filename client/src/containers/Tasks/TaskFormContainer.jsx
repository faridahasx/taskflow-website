// External imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// Utils
import { MISSING_INPUT_FIELD, UNKNOWN_ERROR } from "constants/alertMessages";
// Custom hooks
import useMakeServerRequest from "hooks/useMakeServerRequest";
// Component
import TaskForm from "components/Tasks/TaskForm/TaskForm";

const TaskFormContainer = (props) => {
  // Destructuring props
  const {
    newTask,
    errorDuringFetch,
    handleTryFetchAgain,
    setNewTask,
    onSubmit,
    handleCloseEditor,
  } = props;

  // Redux dispatch function
  const dispatch = useDispatch();
  // Access the state from Redux store
  const categories = useSelector((state) => state.categories);

  // Custom hook for handling authenticated requests
  const { executeServerRequest, loading } = useMakeServerRequest();

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
      dispatch({ type: "ALERT", payload: MISSING_INPUT_FIELD });
    } else {
      // Execute the server request
      await executeServerRequest({
        callback: onSubmit,
        successMessage: "Saved",
        fallbackErrorMessage: UNKNOWN_ERROR,
      });
    }
  };

  // Render the TaskForm component
  return (
    <TaskForm
      startDate={startDate}
      finishDate={finishDate}
      description={description}
      title={title}
      category={category}
      saved={saved}
      categories={categories}
      loading={loading}
      errorDuringFetch={errorDuringFetch}
      handleTryFetchAgain={handleTryFetchAgain}
      handleInputChange={handleInputChange}
      handleSetStartDate={handleSetStartDate}
      handleSetFinishDate={handleSetFinishDate}
      handleSetDescription={handleSetDescription}
      handleSubmit={handleSubmit}
      handleCloseEditor={handleCloseEditor}
    />
  );
};

TaskFormContainer.propTypes = {
  newTask: PropTypes.object.isRequired,
  errorDuringFetch: PropTypes.any,
  handleTryFetchAgain: PropTypes.func,
  setNewTask: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCloseEditor: PropTypes.func.isRequired,
};

export default TaskFormContainer;
