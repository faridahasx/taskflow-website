// External Imports
import { Suspense, lazy, useEffect, useState } from "react";
import PropTypes from "prop-types";
// Custom hooks
import useKeyDownListener from "../../hooks/useKeyDownListener";
// Components
import ModalLoading from "../Loading/LoadingModal";
import CircularLoading from "../Loading/CircularLoading";
import CategoryListItem from "./CategoryListItem";
import DefaultCategoryListItem from "./DefaultCategoryListItem";
import OpenAddCategoryButton from "./OpenAddCategoryButton";
import PortalComponent from "../PortalComponent";
// Styles
import "./CategoriesSlider.css";
// Lazy-loaded Components
const DeleteCategory = lazy(() =>
  import("../../containers/Categories/DeleteCategoryContainer")
);
const CategoryForm = lazy(() =>
  import("../../containers/Categories/CategoryFormContainer")
);

const CategorieSlider = (props) => {
  // Destructure props
  const { categories, loading, categoriesOpen, setCategoriesOpen } = props;

  // State to track current category dialog
  const [openDialog, setOpenDialog] = useState({
    currentDialog: "",
    currentCategory: {},
  });
  const { currentDialog, currentCategory } = openDialog;

  // Effect Hook to handle body overflow when categories slider opens
  useEffect(() => {
    categoriesOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [categoriesOpen]);

  // Function to close the currently open dialog
  const handleCloseDialog = () => {
    setOpenDialog((prev) => ({ ...prev, currentDialog: "" }));
  };

  // Function to open the add Category dialog
  const handleOpenAddCategoryClick = () => {
    setOpenDialog((prev) => ({ ...prev, currentDialog: "add" }));
  };
  // Function to open the delete category dialog
  const handleDeleteClick = () => {
    setOpenDialog((prev) => ({ ...prev, currentDialog: "delete" }));
  };
  // Function to open the edit category title dialog
  const handleEditClick = () => {
    setOpenDialog((prev) => ({ ...prev, currentDialog: "edit" }));
  };

  // Function to handle background click and close the categories slider if clicked outside
  const handleClickBackground = (e) => {
    e.target.id === "categories-dropdown" && setCategoriesOpen(false);
  };

  // Function to handle key press and close categories slider or category dialog on ESC
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (categoriesOpen & !currentDialog) setCategoriesOpen(false);
      else if (currentDialog !== "")
        setOpenDialog({ currentDialog: "", currentCategory: {} });
    }
  };

  // Hook to listen for key down events and invoke handleKeyDown function
  useKeyDownListener(handleKeyDown, !categoriesOpen);

  useEffect(() => {
    !categoriesOpen && currentDialog && handleCloseDialog();
  }, [categoriesOpen, currentDialog]);

  return (
    <div
      data-testid="categories"
      id="categories-dropdown"
      className={`categories-slider ${
        categoriesOpen ? "categories-slider-open" : ""
      }`}
      onClick={handleClickBackground}
    >
      <div className={`categories ${categoriesOpen ? "open-categories" : ""}`}>
        <div id="categories-list-container" className="center">
          {loading ? (
            <CircularLoading />
          ) : (
            categories &&
            categories.length > 0 && (
              <ol id="categories-list" autoFocus>
                <DefaultCategoryListItem
                  tasksCount={`(${categories[0]["tasks"]})`}
                />
                {categories.map(
                  (c) =>
                    c.title !== "All" && (
                      <CategoryListItem
                        key={c._id}
                        category={c}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        handleCloseDialog={handleCloseDialog}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )
                )}
              </ol>
            )
          )}
        </div>
        <OpenAddCategoryButton onClick={handleOpenAddCategoryClick} />
      </div>
      <PortalComponent>
        <Suspense fallback={<ModalLoading handleClose={handleCloseDialog} />}>
          {currentDialog === "add" ? (
            <CategoryForm
              label="Add category"
              handleCloseDialog={handleCloseDialog}
            />
          ) : currentDialog === "edit" ? (
            <CategoryForm
              label="Rename"
              handleCloseDialog={handleCloseDialog}
              category={currentCategory}
            />
          ) : (
            currentDialog === "delete" && (
              <DeleteCategory
                handleCloseDialog={handleCloseDialog}
                category={currentCategory}
              />
            )
          )}
        </Suspense>
      </PortalComponent>
    </div>
  );
};

CategorieSlider.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  categoriesOpen: PropTypes.bool.isRequired,
  setCategoriesOpen: PropTypes.func.isRequired,
};

export default CategorieSlider;
