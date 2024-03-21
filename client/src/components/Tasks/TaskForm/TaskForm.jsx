// External imports
import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Custom hooks
import useBodyOverflowHidden from "hooks/useBodyOverflowHidden";
// Components
import SubmitButton from "components/IconButtons/SubmitButton";
import TryAgain from "components/IconButtons/TryAgain";
import ConfirmationDialog from "components/ConfirmationDialog/ConfirmationDialog";
import CircularLoading from "components/Loading/CircularLoading";
import TaskDialog from "../TaskDialog";
import Editor from "./TextEditor/Editor";
import SelectTaskDetails from "./SelectTaskDetails";
// Styles
import "./TaskForm.css";

const TaskForm = (props) => {
  // Destructure props
  const {
    startDate,
    finishDate,
    description,
    title,
    category,
    saved,
    categories,
    loading,
    errorDuringFetch,
    handleTryFetchAgain,
    handleInputChange,
    handleSetStartDate,
    handleSetFinishDate,
    handleSetDescription,
    handleSubmit,
    handleCloseEditor,
  } = props;
  // Custom hook to handle body overflow
  useBodyOverflowHidden();
  // Local state
  const [confirmCloseUnsaved, setConfirmCloseUnsaved] = useState(false);

  // Handle close button click
  const handleConfirmClose = () => {
    // Check if changes are saved before closing
    saved ? handleCloseEditor() : setConfirmCloseUnsaved(true);
  };

  // Handle cancel close action
  const handleCancelClose = () => {
    setConfirmCloseUnsaved(false);
  };

  return (
    <TaskDialog
      handleBackgroundClick={handleConfirmClose}
      handleCloseClick={handleConfirmClose}
      RightButton={
        <SubmitButton
          className="task-save-btn"
          title="Save"
          form="task-form"
          loading={loading}
          disabled={loading || description === undefined}
        />
      }
    >
      <form
        aria-label="Task Form"
        id="task-form"
        className="column"
        onSubmit={handleSubmit}
      >
        <input
          aria-label="Title"
          className="task-dialog-title"
          name="title"
          value={title}
          placeholder="Title..."
          type="text"
          maxLength={200}
          onChange={handleInputChange}
          required
          autoFocus
        />

        {description === undefined ? (
          <div className="description-input-loading center">
            {errorDuringFetch ? (
              <TryAgain onClick={handleTryFetchAgain} />
            ) : (
              <CircularLoading />
            )}
          </div>
        ) : (
          <Editor
            description={description}
            handleSetDescription={handleSetDescription}
          />
        )}
        <SelectTaskDetails
          startDate={startDate}
          finishDate={finishDate}
          category={category}
          categories={categories}
          handleSetStartDate={handleSetStartDate}
          handleSetFinishDate={handleSetFinishDate}
          handleInputChange={handleInputChange}
        />
      </form>

      {confirmCloseUnsaved && (
        <ConfirmationDialog
          cancelButtonText="Back To Editor"
          confirmButtonText="Exit Anyway"
          heading="Your draft will be lost"
          loading={loading}
          handleCloseDialog={handleCancelClose}
          handleCancel={handleCancelClose}
          handleConfirm={handleCloseEditor}
        />
      )}
    </TaskDialog>
  );
};

TaskForm.propTypes = {
  startDate: PropTypes.instanceOf(dayjs),
  finishDate: PropTypes.instanceOf(dayjs),
  description: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string.isRequired,
  saved: PropTypes.bool,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  errorDuringFetch: PropTypes.any,
  handleTryFetchAgain: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  handleSetStartDate: PropTypes.func.isRequired,
  handleSetFinishDate: PropTypes.func.isRequired,
  handleSetDescription: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCloseEditor: PropTypes.func.isRequired,
};

export default TaskForm;
