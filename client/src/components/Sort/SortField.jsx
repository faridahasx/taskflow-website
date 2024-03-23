import PropTypes from "prop-types";
// MUI components
import CheckIcon from "@mui/icons-material/Check";

const SortField = (props) => {
  const { name, value, currentSort, handleSorting } = props;
  const handleClick = () => handleSorting(value);

  return (
    <li className="center sort-component">
      <button
        className={`sort-field flex ${
          currentSort === value ? " sort-field-active" : ""
        }`}
        title={name}
        onClick={handleClick}
      >
        <span className="center sort-field-icon">
          <CheckIcon />
        </span>
        {name}
      </button>
    </li>
  );
};

SortField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  currentSort: PropTypes.string,
  handleSorting: PropTypes.func.isRequired,
};

export default SortField;
