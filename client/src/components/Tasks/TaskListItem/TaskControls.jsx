// External imports
import { useState } from "react";
import PropTypes from "prop-types";
// MUI Components
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Components
import EditButton from "../../IconButtons/EditButton";
import IconButton from "../../IconButtons/IconButton";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
// Styles
import "./TaskControls.css";

const TaskControls = (props) => {
  // Destructure props
  const {
    task,
    handleClickEditTask,
    expandDetailsTaskID,
    setExpandDetailsTaskID,
    handleDelete,
  } = props;
  // Deleting task
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const handleDeleteClick = () => setConfirmDeleteDialogOpen(true);
  const handleCancelDelete = () => setConfirmDeleteDialogOpen(false);
  const handleConfirmDelete = () => handleDelete(task);

  // Function to expand task details
  const handleExpandTaskDetails = () => {
    setExpandDetailsTaskID((prev) => (prev === task._id ? "" : task._id));
  };

  return (
    <>
      <div className="column task-controls">
        <IconButton
          Icon={<ExpandMoreIcon />}
          buttonProps={{
            title: expandDetailsTaskID === task._id ? "Collapse" : "Expand",
            className: `expand ${
              expandDetailsTaskID === task._id ? "collapse" : ""
            }`,
            onClick: handleExpandTaskDetails,
          }}
        />
        {expandDetailsTaskID === task._id && (
          <>
            <EditButton onClick={handleClickEditTask} />
            <IconButton
              Icon={<DeleteIcon />}
              buttonProps={{
                title: "Delete",
                onClick: handleDeleteClick,
              }}
            />
          </>
        )}
      </div>
      {confirmDeleteDialogOpen && (
        <ConfirmationDialog
          handleCloseDialog={handleCancelDelete}
          handleCancel={handleCancelDelete}
          handleConfirm={handleConfirmDelete}
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          heading="This action is unrecoverable"
        />
      )}
    </>
  );
};

TaskControls.propTypes = {
  task: PropTypes.object.isRequired,
  handleClickEditTask: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setExpandDetailsTaskID: PropTypes.func.isRequired,
  expandDetailsTaskID: PropTypes.string.isRequired,
};

export default TaskControls;
