// External imports
import PropTypes from "prop-types";
// Components
import CircularLoading from "../Loading/CircularLoading";
// Styles
import "./SubmitButton.css";

const SubmitButton = (props) => {
  const { loading, buttonText, ...buttonProps } = props;


  return (
    <button className={`center submit-btn ${!buttonProps.disabled?"active":""}`}title={buttonText} {...buttonProps}>
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
