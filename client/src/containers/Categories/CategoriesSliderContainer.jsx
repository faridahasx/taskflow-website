// External imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// Custom hooks
import useAuthRequest from "../../hooks/useAuthRequest";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Component
import CategorieSlider from "../../components/Categories/CategoriesSlider";

const CategoriesSliderContainer = (props) => {
  // Destructuring props
  const { categoriesOpen, setCategoriesOpen } = props;

  // Redux state and dispatch setup
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  // Local state for initial fetch status
  const [initialFetch, setInitialFetch] = useState(false);
  // Custom hook for handling authenticated requests and loading state
  const [executeAuthRequest, loading] = useAuthRequest();

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
            title: "All",
            tasks: res.data.totalTasks,
            _id: "All",
          },
          ...res.data.categories,
        ],
      });
      // Updating initialFetch state
      setInitialFetch(true);
    };
    // Fetch categories only if it's the initial load and categories are empty
    !initialFetch &&
      categories.length <= 1 &&
      executeAuthRequest(fetchCategories);
  }, [executeAuthRequest, dispatch, initialFetch, categories.length]);

  // Rendering CategorieSlider component with necessary props
  return (
    <CategorieSlider
      categories={categories}
      loading={loading}
      categoriesOpen={categoriesOpen}
      setCategoriesOpen={setCategoriesOpen}
    />
  );
};

CategoriesSliderContainer.propTypes = {
  categoriesOpen: PropTypes.bool.isRequired,
  setCategoriesOpen: PropTypes.func.isRequired,
};

export default CategoriesSliderContainer;
