// External imports
import PropTypes from "prop-types";
// Components
import Modal from "components/Modal/Modal";
import CloseButton from "components/IconButtons/CloseButton";
// Styles
import "./TaskDialog.css";

const TaskDialog = (props) => {
  // Destructure props
  const { children, RightButton, handleBackgroundClick, handleCloseClick } =
    props;
  return (
    <Modal className="task-modal" handleClose={handleBackgroundClick}>
      <div className="task-dialog">
        <div className="flex task-dialog-top">
          <CloseButton onClick={handleCloseClick} type="button" />
          {RightButton}
        </div>
        {children}
      </div>
    </Modal>
  );
};

TaskDialog.propTypes = {
  children: PropTypes.any.isRequired,
  RightButton: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  handleBackgroundClick: PropTypes.func.isRequired,
  handleCloseClick: PropTypes.func.isRequired,
};

export default TaskDialog;
