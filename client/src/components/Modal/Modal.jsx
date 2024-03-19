// External imports
import PropTypes from "prop-types";
import { useMemo } from "react";
// Styles
import "./Modal.css";

const Modal = ({ handleClose, children, className }) => {
  const backgroundClass = useMemo(()=> `modal ${className ? className : ""}`, className)
  
  const handleClick = (e) => {
    e.target.className === backgroundClass && handleClose && handleClose();
  };

  return (
    <div className={backgroundClass} onClick={handleClick}>
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
