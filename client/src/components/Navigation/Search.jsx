// External imports
import PropTypes from "prop-types";
// Custom hooks
import useClickOutside from "../../hooks/useClickOutside";
// Components
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const Search = (props) => {
  // Destructure props
  const {
    handleSubmit,
    handleInputChange,
    searchResults,
    inputValue,
    loading,
    handleLinkClick,
    handleClose,
    handleClear,
  } = props;

  // Ref for handling clicks outside the container
  const containerRef = useClickOutside(handleClose);
  return (
    <div ref={containerRef}>
      <SearchForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        loading={loading}
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
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  inputValue: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Search;
