// External imports
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// MUI Components
import SearchIcon from "@mui/icons-material/Search";
// Styles
import "./SearchResults.css";

const SearchResults = (props) => {
  // Destructure props
  const { searchResults, handleLinkClick } = props;

  return (
    <ul
      aria-label="Search Results"
      id="search-results"
      data-testid="search-result"
    >
      {searchResults.map((s) => (
        <li key={s._id}>
          <Link
            className="flex"
            onClick={(e) => handleLinkClick(e, s._id, s.title)}
          >
            <span className="s-icon center">
              <SearchIcon />
            </span>
            <span
              aria-label="Title of the Task"
              className="text-overflow"
              title={s.title}
            >
              {s.title}
            </span>
            <span
              aria-label="Category of the Task"
              className="text-overflow"
              title={s.category}
            >
              {s.category}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
};

export default SearchResults;
