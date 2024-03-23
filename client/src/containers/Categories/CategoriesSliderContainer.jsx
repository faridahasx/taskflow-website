// External imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// Custom hooks
import useMakeServerRequest from "hooks/useMakeServerRequest";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
// Component
import CategorieSlider from "components/Categories/CategoriesSlider";

const CategoriesSliderContainer = (props) => {
  // Destructuring props
  const { categoriesOpen, setCategoriesOpen } = props;

  // Redux state and dispatch setup
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  // Local state for initial fetch status
  const [initialFetch, setInitialFetch] = useState(false);
  // Custom hook for handling authenticated requests and loading state
  const { executeServerRequest, loading, error, handleTryAgain } =
    useMakeServerRequest();

  // Effect hook to fetch categories on component mount
  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      const res = await axiosWithCredentials.get("/category");
      // Dispatching action to update categories on Redux store
      dispatch({
        type: "FETCH_CATEGORIES",
        payload: [
          {
            _id: "All",
            tasks: res.data.totalTasks,
            title: "All",
          },
          ...res.data.categories,
        ],
      });
      // Updating initialFetch state
      setInitialFetch(true);
    };
    // Fetch categories only if it's the initial load and categories are empty
    !error &&
      !initialFetch &&
      categories.length < 1 &&
      executeServerRequest({ callback: fetchCategories });
  }, [dispatch, initialFetch, categories.length, error]);

  // Rendering CategorieSlider component with necessary props
  return (
    <CategorieSlider
      categories={categories}
      loading={loading}
      errorDuringFetch={error}
      categoriesOpen={categoriesOpen}
      setCategoriesOpen={setCategoriesOpen}
      handleTryAgain={handleTryAgain}
    />
  );
};

CategoriesSliderContainer.propTypes = {
  categoriesOpen: PropTypes.bool.isRequired,
  setCategoriesOpen: PropTypes.func.isRequired,
};

export default CategoriesSliderContainer;
