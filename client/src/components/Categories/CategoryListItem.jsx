// External imports
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// MUI components
import { MoreVertOutlined } from "@mui/icons-material";
// Components
import IconButton from "../IconButtons/IconButton";
// Styles
import "./CategoryListItem.css";

// Lazy-loaded components
const CategoryControls = lazy(() => import("./CategoryControls"));

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
    <li className="category-li flex">
      <Link className="flex text-overflow" to={`/?categories=${title}`}>
        <span className="text-overflow" title={title}>
          {title}
        </span>
        <span title={`${tasks} tasks`}>{`(${tasks})`}</span>
      </Link>
      <IconButton
        Icon={<MoreVertOutlined />}
        buttonProps={{
          title: "More",
          onClick: handleClickOnShowMore,
          "data-testid": `${category.title}-menu`,
        }}
      />
      {currentDialog === "menu" && currentCategory._id === category._id && (
        <Suspense>
          <CategoryControls
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
