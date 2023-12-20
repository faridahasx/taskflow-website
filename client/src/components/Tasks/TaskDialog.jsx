// External imports
import PropTypes from "prop-types";
// Components
import Modal from "../Modal/Modal";
import CloseButton from "../IconButtons/CloseButton";
// Styles
import "./TaskDialog.css";

const TaskDialog = (props) => {
  // Destructure props
  const { children, handleBackgroundClick, handleCloseClick, SecondButton } =
    props;
  return (
    <Modal handleClose={handleBackgroundClick} className=" task-modal">
      <div className="task-dialog">
        <div className="flex task-dialog-top">
          <CloseButton onClick={handleCloseClick} />
          {SecondButton}
        </div>
        {children}
      </div>
    </Modal>
  );
};

TaskDialog.propTypes = {
  children: PropTypes.any.isRequired,
  SecondButton: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  handleBackgroundClick: PropTypes.func.isRequired,
  handleCloseClick: PropTypes.func.isRequired,
};

export default TaskDialog;
