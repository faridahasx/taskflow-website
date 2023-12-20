// External imports
import PropTypes from "prop-types";
// Styles
import "./CancelButton.css";

const CancelButton = ({ onClick, buttonText }) => {
  return (
    <button className="center cancel-btn" title={buttonText} onClick={onClick}>
      {buttonText}
    </button>
  );
};

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CancelButton;
