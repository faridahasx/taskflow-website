// External imports
import PropTypes from "prop-types";
// Components
import Modal from "components/Modal/Modal";
import CancelButton from "components/TextButtons/CancelButton";
import SubmitButton from "components/TextButtons/SubmitButton";
// Styles
import "./ConfirmationDialog.css";

const ConfirmationDialog = (props) => {
  // Destructuring props
  const {
    cancelButtonText,
    confirmButtonText,
    heading,
    loading,
    handleCloseDialog,
    handleCancel,
    handleConfirm,
  } = props;

  return (
    <Modal handleClose={handleCloseDialog}>
      <div aria-describedby="dialaog-heading" className="confirmation-dialog">
        <h1 id="dialaog-heading">{heading}</h1>
        <div className="flex dialog-btns">
          {cancelButtonText && (
            <CancelButton
              buttonText={cancelButtonText}
              onClick={handleCancel}
            />
          )}

          <SubmitButton
            buttonText={confirmButtonText}
            loading={loading}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

ConfirmationDialog.propTypes = {
  cancelButtonText: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  handleCloseDialog: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
