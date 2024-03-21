// External imports
import PropTypes from "prop-types";
// Styles
import "./CancelButton.css";

const CancelButton = (props) => {
  const { buttonText, ...buttonProps } = props;

  return (
    <button className="center cancel-btn" title={buttonText} {...buttonProps}>
      {buttonText}
    </button>
  );
};

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CancelButton;
