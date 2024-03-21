// External imports
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// MUI Components
import DeleteIcon from "@mui/icons-material/Delete";
// Custom hooks
import useMakeServerRequest from "hooks/useMakeServerRequest";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
import {
  PERMANENT_ACTION,
  TASK_DELETED,
  DELETE_TASK_FAILED,
} from "constants/alertMessages";
// Context
import { TasksDispatchContext } from "context/TaskContext";
// Components
import ConfirmationDialog from "components/ConfirmationDialog/ConfirmationDialog";
import IconButton from "components/IconButtons/IconButton";
import CircularLoading from "components/Loading/CircularLoading";

const DeleteTaskButtonContainer = (props) => {
  // Destructure props
  const { taskID, taskCategory } = props;
  // State
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  // Custom hook for handling authenticated requests
  const { executeServerRequest, loading } = useMakeServerRequest();
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
    executeServerRequest({
      callback: deleteTask,
      trackErrorState: false,
      successMessage: TASK_DELETED,
      fallbackErrorMessage: DELETE_TASK_FAILED,
    });
  };

  return (
    <>
      <IconButton
        aria-label="Delete Task"
        title="Delete"
        onClick={handleDeleteClick}
        Icon={loading ? <CircularLoading /> : <DeleteIcon />}
        disabled={loading}
      />
      {confirmDeleteDialogOpen && (
        <ConfirmationDialog
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          heading={PERMANENT_ACTION}
          handleCloseDialog={handleCancelDelete}
          handleCancel={handleCancelDelete}
          handleConfirm={handleConfirmDelete}
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
