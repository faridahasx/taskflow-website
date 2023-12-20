// External imports
import { useContext } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// Custom hooks
import useAuthRequest from "../../hooks/useAuthRequest";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Context
import { TasksDispatchContext } from "../../context/TaskContext";
// Component
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";

const DeleteCategoryContainer = (props) => {
  // Destructuring props
  const { handleCloseDialog, category } = props;
  // Redux dispatch setup
  const dispatch = useDispatch();
  // Context dispatch setup
  const dispatchTasks = useContext(TasksDispatchContext);
  // Custom hook for handling authenticated requests and loading state
  const [executeAuthRequest, loading] = useAuthRequest();

  // Function to handle category deletion
  const handleDelete = async () => {
    await executeAuthRequest(async () => {
      await axiosWithCredentials.delete(`/category/${category.title}`);
      // Update categories in Redux state
      dispatch({
        type: "DELETE_CATEGORY",
        payload: category,
      });
      // Delete tasks of this category in context
      dispatchTasks({ type: "delete_category", payload: category.title });
    }, "Category deleted");
    // Close the dialog
    handleCloseDialog();
  };

  // Rendering ConfirmationDialog component with necessary props
  return (
    <ConfirmationDialog
      handleCloseDialog={handleCloseDialog}
      handleCancel={handleCloseDialog}
      handleConfirm={handleDelete}
      loading={loading}
      cancelButtonText="Cancel"
      confirmButtonText="Delete"
      heading="This action is unrecoverable"
    />
  );
};

DeleteCategoryContainer.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  category: PropTypes.object,
};

export default DeleteCategoryContainer;
