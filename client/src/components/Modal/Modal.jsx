// External imports
import { useMemo } from "react";
import PropTypes from "prop-types";
// Styles
import "./Modal.css";

const Modal = ({ handleClose, children, className, ...otherProps }) => {
  const backgroundClass = useMemo(
    () => `modal ${className ? className : ""}`,
    [className]
  );

  const handleClick = (e) => {
    e.target.className === backgroundClass && handleClose && handleClose();
  };

  return (
    <div
      role="dialog"
      className={backgroundClass}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </div>
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  handleClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
};

export default Modal;
