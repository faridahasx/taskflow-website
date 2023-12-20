// External imports
import PropTypes from "prop-types";
// Custom hooks
import useClickOutside from "../../hooks/useClickOutside";
// Styles
import "./CategoryControls.css";

const CategoryControls = (props) => {
  // Destructure props
  const { handleCloseDialog, handleDeleteClick, handleEditClick } = props;
  // Ref to handle click outside
  const containerRef = useClickOutside(handleCloseDialog);

  return (
    <ul className="category-controls-list" ref={containerRef}>
      <li className="center">
        <button className="center" title="Rename" onClick={handleEditClick}>
          Rename
        </button>
      </li>
      <li className="center">
        <button className="center" title="Delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </li>
    </ul>
  );
};

CategoryControls.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default CategoryControls;
