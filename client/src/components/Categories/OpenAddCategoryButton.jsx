import PropTypes from "prop-types";
import { Add } from "@mui/icons-material";
import "./OpenAddCategoryButton.css";

const OpenAddCategoryButton = ({ onClick }) => {
  return (
    <button
      id="add-category"
      className="center"
      title="Add new category"
      onClick={onClick}
    >
      <span className="center">
        <Add />
      </span>
      New Category
    </button>
  );
};

OpenAddCategoryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default OpenAddCategoryButton;
