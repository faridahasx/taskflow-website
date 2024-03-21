// External imports
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// MUI components
import { MoreVertOutlined } from "@mui/icons-material";
// Components
import IconButton from "components/IconButtons/IconButton";
// Styles
import "./CategoryListItem.css";

// Lazy-loaded components
const CategoryActions = lazy(() => import("./CategoryActions"));

const CategoryListItem = (props) => {
  // Destructure props
  const {
    category,
    openDialog,
    setOpenDialog,
    handleCloseDialog,
    handleEditClick,
    handleDeleteClick,
  } = props;
  // Destructure category properties
  const { title, tasks } = category;
  // Destructure openDialog properties
  const { currentDialog, currentCategory } = openDialog;

  // Function to handle clicks to show category controls menu
  const handleClickOnShowMore = () => {
    setOpenDialog({
      currentCategory: category,
      currentDialog: "menu",
    });
  };

  return (
    <li aria-label="Category" className="category-li flex">
      <Link className="flex text-overflow" to={`/?categories=${title}`}>
        <span className="text-overflow" title={title}>
          {title}
        </span>
        <span title={`${tasks} tasks`}>{`(${tasks})`}</span>
      </Link>
      <IconButton
        aria-label="More Category Actions"
        data-testid={`${category.title}-menu`}
        title="More"
        onClick={handleClickOnShowMore}
        Icon={<MoreVertOutlined />}
      />
      {currentDialog === "menu" && currentCategory._id === category._id && (
        <Suspense>
          <CategoryActions
            handleCloseDialog={handleCloseDialog}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </Suspense>
      )}
    </li>
  );
};

CategoryListItem.propTypes = {
  category: PropTypes.object.isRequired,
  openDialog: PropTypes.shape({
    currentCategory: PropTypes.object,
    currentDialog: PropTypes.string,
  }).isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default CategoryListItem;
