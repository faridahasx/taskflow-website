// External imports
import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Custom hooks
import useBodyOverflowHidden from "../../../hooks/useBodyOverflowHidden";
// Components
import SubmitButton from "../../IconButtons/SubmitButton";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import CircularLoading from "../../Loading/CircularLoading";
import Editor from "./TextEditor/Editor";
import TaskDialog from "../TaskDialog";
import SelectTaskDetails from "./SelectTaskDetails";
// Styles
import "./TaskForm.css";

const TaskForm = (props) => {
  // Destructure props
  const {
    handleCloseEditor,
    handleSubmit,
    handleInputChange,
    title,
    category,
    startDate,
    handleSetStartDate,
    finishDate,
    handleSetFinishDate,
    description,
    handleSetDescription,
    loading,
    saved,
    categories,
  } = props;
  // Custom hook to handle body overflow
  useBodyOverflowHidden();
  // Local state for cancel confirmation
  const [showCancelCloseDialog, setShowCancelCloseDialog] = useState(false);

  const handleShowCloseEditorOptions = () => {
    saved ? handleCloseEditor() : setShowCancelCloseDialog(true);
  };

  // Handle close button click
  const handleCloseClick = (e) => {
    e.preventDefault();
    // Check if changes are saved before closing
    handleShowCloseEditorOptions();
  };

  // Handle cancel close action
  const handleCancelClose = () => {
    setShowCancelCloseDialog(false);
  };

  return (
    <TaskDialog
      handleBackgroundClick={handleShowCloseEditorOptions}
      handleCloseClick={handleCloseClick}
      SecondButton={
        <SubmitButton
          loading={loading}
          buttonProps={{
            form: "task-form",
            title: "Save task",
            disabled: loading,
          }}
        />
      }
    >
      <form onSubmit={handleSubmit} id="task-form" className="column">
        <input
          className="task-dialog-title"
          maxLength={200}
          required
          autoFocus
          placeholder="Title..."
          onChange={handleInputChange}
          type="text"
          name="title"
          value={title}
        />

        {description === undefined ? (
          <div className="description-input-loading center">
            <CircularLoading />
          </div>
        ) : (
          <Editor
            description={description}
            handleSetDescription={handleSetDescription}
          />
        )}
        <SelectTaskDetails
          handleInputChange={handleInputChange}
          handleSetStartDate={handleSetStartDate}
          handleSetFinishDate={handleSetFinishDate}
          category={category}
          startDate={startDate}
          finishDate={finishDate}
          categories={categories}
        />
      </form>

      {showCancelCloseDialog && (
        <ConfirmationDialog
          handleCloseDialog={handleCancelClose}
          handleCancel={handleCancelClose}
          cancelButtonText="Cancel"
          handleConfirm={handleCloseEditor}
          confirmButtonText="Exit"
          loading={loading}
          heading="Your draft will be lost"
        />
      )}
    </TaskDialog>
  );
};

TaskForm.propTypes = {
  handleCloseEditor: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSetStartDate: PropTypes.func.isRequired,
  handleSetFinishDate: PropTypes.func.isRequired,
  handleSetDescription: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  startDate: PropTypes.instanceOf(dayjs),
  finishDate: PropTypes.instanceOf(dayjs),
  saved: PropTypes.bool,
};

export default TaskForm;
