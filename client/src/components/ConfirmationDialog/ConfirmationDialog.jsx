// External imports
import PropTypes from "prop-types";
// Components
import Modal from "../Modal/Modal";
import CancelButton from "../TextButtons/CancelButton";
import SubmitButton from "../TextButtons/SubmitButton";
// Styles
import "./ConfirmationDialog.css";

const ConfirmationDialog = (props) => {
  // Destructuring props
  const {
    handleCloseDialog,
    handleCancel,
    handleConfirm,
    cancelButtonText,
    confirmButtonText,
    heading,
    loading,
  } = props;

  return (
    <Modal handleClose={handleCloseDialog}>
      <div className="confirmation-dialog">
        <h1>{heading}</h1>
        <div className="flex">
          <CancelButton buttonText={cancelButtonText} onClick={handleCancel} />
          <SubmitButton
            buttonText={confirmButtonText}
            loading={loading}
            buttonProps={{ onClick: handleConfirm }}
          />
        </div>
      </div>
    </Modal>
  );
};

ConfirmationDialog.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default ConfirmationDialog;
