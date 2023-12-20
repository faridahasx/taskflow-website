// External imports
import PropTypes from "prop-types";
import "./ActivateFiltersButton.css";

const ActivateFiltersButton = ({ handleClick, buttonTxt, value, isActive }) => {
  const onClick = () => handleClick(value);

  return (
    <button
      className={`center activate-filter-btn ${
        isActive ? "active" : "inactive"
      }-filter`}
      onClick={onClick}
      title={`${buttonTxt} tasks`}
    >
      {buttonTxt}
    </button>
  );
};

ActivateFiltersButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  buttonTxt: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
export default ActivateFiltersButton;
