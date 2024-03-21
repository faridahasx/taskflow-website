// External imports
import PropTypes from "prop-types";
// Custom hooks
import useClickOutside from "hooks/useClickOutside";
// Components
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const Search = (props) => {
  // Destructure props
  const {
    inputValue,
    loading,
    searchResults,
    handleInputChange,
    handleLinkClick,
    handleSubmit,
    handleClear,
    handleClose,
  } = props;

  // Ref for handling clicks outside the container
  const containerRef = useClickOutside(handleClose);
  return (
    <div role="search" ref={containerRef}>
      <SearchForm
        inputValue={inputValue}
        loading={loading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleClear={handleClear}
      />
      {searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          handleLinkClick={handleLinkClick}
        />
      )}
    </div>
  );
};

Search.propTypes = {
  inputValue: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  searchResults: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Search;
