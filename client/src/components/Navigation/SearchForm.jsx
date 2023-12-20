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
  const { handleSubmit, handleInputChange, inputValue, loading, handleClear } =
    props;

  return (
    <form id="search-form" className="flex" onSubmit={handleSubmit}>
      <button className="center s-icon" type="submit">
        <SearchIcon />
      </button>
      <input
        autoFocus
        data-testid="search"
        type="search"
        onChange={handleInputChange}
        placeholder="Search"
        value={inputValue}
      />
      {loading && inputValue && (
        <span id="search-loading" className="center">
          <CircularProgress style={{ color: "grey", scale: "0.5" }} />
        </span>
      )}
      {inputValue && (
        <button className="center s-icon" type="button" onClick={handleClear}>
          <ClearIcon />
        </button>
      )}
    </form>
  );
};

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchForm;
