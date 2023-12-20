import PropTypes from "prop-types";
// Custom hooks
import useKeyDownListener from "../../hooks/useKeyDownListener";
// Components
import CloseButton from "../IconButtons/CloseButton";
// Styles
import "./SortAndFiltersWrapper.css";

const SortAndFiltersWrapper = (props) => {
  // Destructuring props
  const {
    children,
    handleClose,
    heading,
    containerRef,
    className = "",
  } = props;

  // Handle Escape and Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClose();
  };

  // Attach keydown event listener
  useKeyDownListener(handleKeyDown);

  // Render compomnent
  return (
    <div className={`sf-wrapper ${className}`} ref={containerRef}>
      <div className="sf-top flex">
        <CloseButton onClick={handleClose} />
        <h3 className="heading-text flex">{heading}</h3>
      </div>
      {children}
    </div>
  );
};

SortAndFiltersWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  handleClose: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SortAndFiltersWrapper;
