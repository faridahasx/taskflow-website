// External imports
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Styles
import "./CategoryListItem";

const DefaultCategoryListItem = ({ tasksCount }) => {
  return (
    <li aria-label="Tasks of all categories" className="category-li flex">
      <Link className="flex" to="/">
        <span className="text-overflow">All</span>
        <span>{tasksCount}</span>
      </Link>
    </li>
  );
};

DefaultCategoryListItem.propTypes = {
  tasksCount: PropTypes.string.isRequired,
};

export default DefaultCategoryListItem;
