import PropTypes from "prop-types";
// Custom hooks
import useKeyDownListener from "hooks/useKeyDownListener";
import useBodyOverflowHidden from "hooks/useBodyOverflowHidden";
// Components
import CloseButton from "components/IconButtons/CloseButton";
// Styles
import "./DialogWrapper.css";
import PortalComponent from "components/PortalComponent";
import Modal from "components/Modal/Modal";

const DialogWrapper = (props) => {
  // Destructuring props
  const {
    className = "",
    heading,
    children,
    containerRef,
    handleClose,
  } = props;

  // Handle Escape and Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClose();
  };

  // Attach keydown event listener
  useKeyDownListener(handleKeyDown);

  useBodyOverflowHidden();

  // Render compomnent
  return (
    <PortalComponent>
      <Modal handleClose={handleClose}>
        <div className={`dialog-wrapper ${className}`} ref={containerRef}>
          <div className="dialog-top flex">
            <CloseButton onClick={handleClose} />
            <h3 className="dialog-heading-text flex">{heading}</h3>
          </div>
          {children}
        </div>
      </Modal>
    </PortalComponent>
  );
};

DialogWrapper.propTypes = {
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DialogWrapper;
