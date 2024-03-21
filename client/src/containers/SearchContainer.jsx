// External imports
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
// Custom hooks
import useMakeServerRequest from "hooks/useMakeServerRequest";
// Component
import Search from "components/Navigation/Search";

const SearchContainer = (props) => {
  // Destructuring props
  const { handleClose } = props;
  // React Router navigation hook
  const navigate = useNavigate();
  // Local state
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Custom hook for handling authenticated requests and loading state
  const { executeServerRequest, loading } = useMakeServerRequest();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Clearing search results before navigating
    setSearchResults([]);
    // Navigating to the home page with the search parameter
    navigate({
      pathname: "/",
      search: createSearchParams({ search: inputValue }).toString(),
    });
  };

  // Function to handle input change in the search input field
  const handleInputChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInputValue(value);
  };

  // Function to handle link click to update UI and trigger navigation
  const handleLinkClick = (e, id, title) => {
    e.preventDefault();
    // Setting input value and clearing search results before navigating
    setInputValue(title);
    setSearchResults([]);
    // Navigating to the home page with the task parameter
    navigate({
      pathname: "/",
      search: createSearchParams({ task: id }).toString(),
    });
  };

  // const handle
  const handleClear = () => setInputValue("");

  // Effect to fetch data based on the search input value
  useEffect(() => {
    // Object to ignore updates after component unmounting
    const ignore = { value: false };
    // Function to fetch data from the server
    const fetchData = async () => {
      const res = await axiosWithCredentials.get(
        `task?&limit=10&search[regex]=${inputValue}`
      );
      // Updating searchResults only if the component is still mounted
      if (!ignore.value) setSearchResults(res.data);
    };
    // Triggering data fetching only if inputValue is not empty
    inputValue && executeServerRequest({ callback: fetchData });
    // Cleanup function to avoid state updates on an unmounted component
    return () => (ignore.value = true);
    // eslint-disable-next-line
  }, [inputValue]);

  // Rendering Search component with necessary props
  return (
    <Search
      inputValue={inputValue}
      loading={loading}
      searchResults={searchResults}
      handleInputChange={handleInputChange}
      handleLinkClick={handleLinkClick}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      handleClear={handleClear}
    />
  );
};

SearchContainer.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default SearchContainer;
