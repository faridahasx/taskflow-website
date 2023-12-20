import PropTypes from "prop-types";
// MUI components
import CheckIcon from "@mui/icons-material/Check";

const SortFieldListItem = (props) => {
  const { handleSorting, sortValue, value, name } = props;
  const handleClick = () => handleSorting(value);

  return (
    <li className="center sf-component">
      <button
        className={`sort-field flex ${
          sortValue === value ? " sort-field-active" : ""
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

SortFieldListItem.propTypes = {
  handleSorting: PropTypes.func.isRequired,
  sortValue: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SortFieldListItem;
