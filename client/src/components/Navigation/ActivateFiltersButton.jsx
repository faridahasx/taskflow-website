// External imports
import PropTypes from "prop-types";
// Styles
import "./ActivateFiltersButton.css";

const ActivateFiltersButton = (props) => {
  // Destructure props
  const { buttonTxt, value, isActive, handleClick } = props;
  const onClick = () => handleClick(value);

  return (
    <button
      aria-label={`${buttonTxt} Tasks`}
      className={`center activate-filter-btn ${
        isActive ? "active" : "inactive"
      }-filter`}
      title={`${buttonTxt} tasks`}
      onClick={onClick}
    >
      {buttonTxt}
    </button>
  );
};

ActivateFiltersButton.propTypes = {
  buttonTxt: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default ActivateFiltersButton;
