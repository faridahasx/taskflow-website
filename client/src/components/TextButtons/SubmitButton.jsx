// External imports
import PropTypes from "prop-types";
// Components
import CircularLoading from "../Loading/CircularLoading";
// Styles
import "./SubmitButton.css";

const SubmitButton = ({ buttonProps, loading, buttonText }) => {
  return (
    <button {...buttonProps} className="center submit-btn" title={buttonText}>
      {loading ? <CircularLoading /> : buttonText}
    </button>
  );
};

SubmitButton.propTypes = {
  loading: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  buttonProps: PropTypes.object,
};

export default SubmitButton;
