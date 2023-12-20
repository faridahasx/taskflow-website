// External imports
import { useContext, useState } from "react";
import PropTypes from "prop-types";
// Custom hooks
import useAuthRequest from "../../hooks/useAuthRequest";
import { useDispatch } from "react-redux";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Context
import { TasksDispatchContext } from "../../context/TaskContext";
// Component
import CategoryForm from "../../components/Categories/CategoryForm";

const CategoryFormContainer = (props) => {
  // Destructuring props
  const { label, category, handleCloseDialog } = props;
  // Redux dispatch setup
  const dispatch = useDispatch();
  // Context dispatch setup
  const dispatchTasks = useContext(TasksDispatchContext);
  // Initialize state
  const [title, setTitle] = useState(category ? category.title : "");
  // Custom hook for handling authenticated requests and loading state
  const [executeAuthRequest, loading] = useAuthRequest();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the title has changed
    if (title !== category?.title) {
      // Validate and execute form method based on label
      if (title === "")
        dispatch({
          type: "ALERT",
          payload: "Please fill out the title field.",
        });
      else
        await executeAuthRequest(
          label === "Add category" ? handleAddCategory : handleEditCategory,
          "Saved"
        );
    } else {
      // Close dialog if there are no changes
      handleCloseDialog();
    }
  };
  // Function to handle adding a new category
  const handleAddCategory = async () => {
    const res = await axiosWithCredentials.post("/category", {
      title: title,
    });
    // Update categories in Redux state
    dispatch({ type: "ADD_CATEGORY", payload: { ...res.data, tasks: 0 } });
    // Close the dialog
    handleCloseDialog();
  };

  // Function to handle editing an existing category
  const handleEditCategory = async () => {
    await axiosWithCredentials.patch(`/category/${category.title}`, {
      newTitle: title,
    });
    // Update categories in redux state
    dispatch({
      type: "EDIT_CATEGORY",
      payload: { ...category, title: title },
    });

    // Update tasks of this category in context
    dispatchTasks({
      type: "edit_category",
      payload: { oldCategoryTitle: category.title, newCategoryTitle: title },
    });
    // Close the dialog
    handleCloseDialog();
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  // Rendering CategoryForm component with necessary props
  return (
    <CategoryForm
      label={label}
      title={title}
      handleCloseDialog={handleCloseDialog}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      loading={loading}
    />
  );
};

CategoryFormContainer.propTypes = {
  label: PropTypes.string,
  category: PropTypes.object,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default CategoryFormContainer;
