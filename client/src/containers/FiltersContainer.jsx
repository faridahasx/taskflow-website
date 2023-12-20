// External imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
// Custom hooks
import useKeyDownListener from "../hooks/useKeyDownListener";
// Utility functions
import { validateCategories, isValidDate } from "../utils/validateFilters";
// Component
import Filters from "../components/Filters/Filters";

const FiltersContainer = ({ handleClose }) => {
  // Redux selector to get categories from the state
  const categories = useSelector((state) => state.categories);

  // Retrieving search parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // State for various filter parameters
  const [startgte, setStartgte] = useState(
    isValidDate(searchParams.get("startgte"))
      ? dayjs(searchParams.get("startgte"))
      : null
  );
  const [startlte, setStartlte] = useState(
    isValidDate(searchParams.get("startlte"))
      ? dayjs(searchParams.get("startlte"))
      : null
  );
  const [finishgte, setFinishgte] = useState(
    isValidDate(searchParams.get("finishgte"))
      ? dayjs(searchParams.get("finishgte"))
      : null
  );
  const [finishlte, setFinishlte] = useState(
    isValidDate(searchParams.get("finishlte"))
      ? dayjs(searchParams.get("finishlte"))
      : null
  );
  const [selectedCategories, setSelectedCategories] = useState(
    validateCategories(searchParams.get("categories")?.split(","), categories)
  );

  //   Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Removing any existing task parameter fro searchParams
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.get("task") && newSearchParams.delete("task");

    // Updating searchParams based on filter values
    selectedCategories.length
      ? newSearchParams.set("categories", selectedCategories.join(","))
      : newSearchParams.delete("categories");

    startgte
      ? newSearchParams.set("startgte", startgte)
      : newSearchParams.delete("startgte");

    startlte
      ? newSearchParams.set("startlte", startlte)
      : newSearchParams.delete("startlte");

    finishgte
      ? newSearchParams.set("finishgte", finishgte)
      : newSearchParams.delete("finishgte");

    finishlte
      ? newSearchParams.set("finishlte", finishlte)
      : newSearchParams.delete("finishlte");

    // Applying the updated search params to the URL
    setSearchParams(newSearchParams);
    // closing the filters
    handleClose();
  };

  // Function to handle clear button click
  const handleClear = (e) => {
    e.preventDefault();
    setSelectedCategories([]);
    // setCompleted("");
    setStartgte(null);
    setStartlte(null);
    setFinishgte(null);
    setFinishlte(null);
  };

  // Function to handle key events (Escape and Enter)
  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClose();
    else if (e.key === "Enter") handleSubmit(e);
  };

  // Hook to listen for keydown events and invoke handleKeyDown function
  useKeyDownListener(handleKeyDown);

  // Rendering Filters component with necessary props
  return (
    <Filters
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      categories={categories}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      startgte={startgte}
      setStartgte={setStartgte}
      startlte={startlte}
      setStartlte={setStartlte}
      finishgte={finishgte}
      setFinishgte={setFinishgte}
      finishlte={finishlte}
      setFinishlte={setFinishlte}
      handleClear={handleClear}
    />
  );
};

FiltersContainer.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default FiltersContainer;
