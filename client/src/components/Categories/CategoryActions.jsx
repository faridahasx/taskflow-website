// External imports
import PropTypes from "prop-types";
// Custom hooks
import useClickOutside from "hooks/useClickOutside";
// Styles
import "./CategoryActions.css";

const CategoryActions = (props) => {
  // Destructure props
  const { handleCloseDialog, handleEditClick, handleDeleteClick } = props;
  // Ref to handle click outside
  const containerRef = useClickOutside(handleCloseDialog);

  return (
    <ul
      aria-label="category-actions"
      className="category-actions-list"
      ref={containerRef}
    >
      <li className="center">
        <button
          aria-label="Rename category"
          className="center"
          title="Rename"
          onClick={handleEditClick}
        >
          Rename
        </button>
      </li>
      <li className="center">
        <button
          aria-label="Delete category"
          className="center"
          title="Delete"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </li>
    </ul>
  );
};

CategoryActions.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default CategoryActions;
