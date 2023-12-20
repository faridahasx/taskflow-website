// External imports
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
// Component
import Sort from "../components/Sort/Sort";

const SortContainer = (props) => {
  // Destructuring props
  const { handleClose } = props;
  // Retrieving search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  // State to keep track of the current sorting value
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || "startDate:-1"
  );

  // Function to handle sorting changes
  const handleSorting = (value) => {
    // Update the local state with the new sorting value
    setSortValue(value);
    // Applying the updated searchParams to the URL
    setSearchParams((prevParams) => {
      // Create new instance of URLSearchParams for immutability
      const newSearchParams = new URLSearchParams(prevParams);
      newSearchParams.set("sort", value);
      return newSearchParams;
    });
    // Close the Sort container
    handleClose();
  };

  // Rendering Sort component with necessary props
  return (
    <Sort
      handleClose={handleClose}
      handleSorting={handleSorting}
      sortValue={sortValue}
    />
  );
};

SortContainer.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default SortContainer;
