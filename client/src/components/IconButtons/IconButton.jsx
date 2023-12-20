// External imports
import PropTypes from "prop-types";
// Styles
import "./Icon.css";

const IconButton = (props) => {
  // Destructure props
  const { Icon, buttonProps = {} } = props;
  const { className } = buttonProps;

  return (
    <button {...buttonProps} className={`icon ${className ? className : ""}`}>
      {Icon}
    </button>
  );
};

IconButton.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object]),
  buttonProps: PropTypes.object,
};

export default IconButton;
