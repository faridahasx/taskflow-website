// External imports
import PropTypes from "prop-types";
// MUI components
import { CircularProgress } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
// Styles
import "./SearchForm.css";

const SearchForm = (props) => {
  // Destructure props
  const { inputValue, loading, handleSubmit, handleInputChange, handleClear } =
    props;

  return (
    <form
      role="search"
      aria-label="Search Form"
      id="search-form"
      className="flex"
      onSubmit={handleSubmit}
    >
      <button className="center s-icon" type="submit">
        <SearchIcon />
      </button>
      <input
        data-testid="search"
        type="search"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
      />
      {loading && inputValue && (
        <span id="search-loading" className="center">
          <CircularProgress style={{ color: "grey", scale: "0.5" }} />
        </span>
      )}
      {inputValue && (
        <button
          aria-label="Clear Search Input"
          className="center s-icon"
          type="button"
          onClick={handleClear}
        >
          <ClearIcon />
        </button>
      )}
    </form>
  );
};

SearchForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

export default SearchForm;
