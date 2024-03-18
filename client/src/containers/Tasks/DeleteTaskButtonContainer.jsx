// External imports
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// MUI Components
import DeleteIcon from "@mui/icons-material/Delete";
// Custom hooks
import useAuthRequest from "../../hooks/useAuthRequest";
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Context
import { TasksDispatchContext } from "../../context/TaskContext";
// Components
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import IconButton from "../../components/IconButtons/IconButton";
import CircularLoading from "../../components/Loading/CircularLoading";

const DeleteTaskButtonContainer = (props) => {
  // Destructure props
  const { taskID, taskCategory } = props;
  // State
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  // Custom hook for handling authenticated requests
  const { executeAuthRequest, loading } = useAuthRequest();
  const dispatchTasks = useContext(TasksDispatchContext);
  const dispatch = useDispatch();

  // Handle Delete Task
  const handleDeleteClick = () => setConfirmDeleteDialogOpen(true);
  const handleCancelDelete = () => setConfirmDeleteDialogOpen(false);

  const handleConfirmDelete = () => {
    const deleteTask = async () => {
      setConfirmDeleteDialogOpen(false);
      await axiosWithCredentials.delete(`task/${taskID}`);
      dispatchTasks({ type: "delete", payload: taskID });
      dispatch({
        type: "TASKS_COUNT",
        payload: { title: taskCategory, count: -1 },
      });
    };
    executeAuthRequest({
      callback: deleteTask,
      trackErrorState: false,
      successMessage: "Deleted Task",
      errorMessage: "Failed to delete the task",
    });
  };

  return (
    <>
      <IconButton
        Icon={loading ? <CircularLoading /> : <DeleteIcon />}
        disabled={loading}
        title="Delete"
        onClick={handleDeleteClick}
      />
      {confirmDeleteDialogOpen && (
        <ConfirmationDialog
          handleCloseDialog={handleCancelDelete}
          handleCancel={handleCancelDelete}
          handleConfirm={handleConfirmDelete}
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          heading="Deleting tasks is a permanent action and cannot be undone."
        />
      )}
    </>
  );
};

DeleteTaskButtonContainer.propTypes = {
  taskID: PropTypes.string.isRequired,
  taskCategory: PropTypes.string.isRequired,
};

export default DeleteTaskButtonContainer;
