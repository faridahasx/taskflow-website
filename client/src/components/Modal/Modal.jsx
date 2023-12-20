// External imports
import PropTypes from "prop-types";
// Styles
import "./Modal.css";

const Modal = ({ handleClose, children, className }) => {
  const handleClick = (e) => {
    const bgClass = `modal${className ? className : ""}`;
    e.target.className === bgClass && handleClose && handleClose();
  };

  return (
    <div className={`modal${className ? className : ""}`} onClick={handleClick}>
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
