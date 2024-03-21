// External imports
import { useContext } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// Custom hooks
import useMakeServerRequest from "hooks/useMakeServerRequest";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
import {
  CATEGORY_DELETED,
  DELETE_CATEGORY_FAILED,
  PERMANENT_ACTION,
} from "constants/alertMessages";
// Context
import { TasksDispatchContext } from "context/TaskContext";
// Component
import ConfirmationDialog from "components/ConfirmationDialog/ConfirmationDialog";

const DeleteCategoryContainer = (props) => {
  // Destructuring props
  const { category, handleCloseDialog } = props;
  // Redux dispatch setup
  const dispatch = useDispatch();
  // Context dispatch setup
  const dispatchTasks = useContext(TasksDispatchContext);
  // Custom hook for handling authenticated requests and loading state
  const { executeServerRequest, loading } = useMakeServerRequest();

  // Function to handle category deletion
  const handleDelete = async () => {
    await executeServerRequest({
      callback: async () => {
        await axiosWithCredentials.delete(`/category/${category.title}`);
        // Update categories in Redux state
        dispatch({
          type: "DELETE_CATEGORY",
          payload: category,
        });
        // Delete tasks of this category in context
        dispatchTasks({ type: "delete_category", payload: category.title });
      },
      successMessage: CATEGORY_DELETED,
      fallbackErrorMessage: DELETE_CATEGORY_FAILED,
    });
    // Close the dialog
    handleCloseDialog();
  };

  // Rendering ConfirmationDialog component with necessary props
  return (
    <ConfirmationDialog
      cancelButtonText="Cancel"
      confirmButtonText="Delete"
      heading={PERMANENT_ACTION}
      loading={loading}
      handleCloseDialog={handleCloseDialog}
      handleCancel={handleCloseDialog}
      handleConfirm={handleDelete}
    />
  );
};

DeleteCategoryContainer.propTypes = {
  category: PropTypes.object,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default DeleteCategoryContainer;
