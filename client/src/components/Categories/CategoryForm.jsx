// External imports
import PropTypes from "prop-types";
// Components
import CancelButton from "../TextButtons/CancelButton";
import SubmitButton from "../TextButtons/SubmitButton";
import Modal from "../Modal/Modal";
// Styles
import "./CategoryForm.css";

const CategoryForm = (props) => {
  // Destructure props
  const {
    label,
    title,
    handleCloseDialog,
    handleSubmit,
    handleInputChange,
    loading,
  } = props;

  // Handle close form dialog
  const handleClose = (e) => {
    e.preventDefault();
    handleCloseDialog();
  };

  return (
    <Modal handleClose={handleCloseDialog} title={label}>
      <div className="category-dialog center">
        <form className="column" onSubmit={handleSubmit} id="category-form">
          {label && <label htmlFor="categoryTitle">{label}</label>}
          <input
            id="categoryTitle"
            required
            autoFocus
            maxLength={50}
            value={title}
            name="categoryTitle"
            onChange={handleInputChange}
            placeholder="Title"
          />
          <div className="flex">
            <CancelButton buttonText="Cancel" onClick={handleClose} />
            <SubmitButton
              loading={loading}
              buttonText="Save"
              buttonProps={{
                form: "category-form",
                disabled: loading || title.length === 0,
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

CategoryForm.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CategoryForm;
