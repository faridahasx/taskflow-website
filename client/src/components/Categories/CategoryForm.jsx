// External imports
import PropTypes from "prop-types";
// Components
import CancelButton from "components/TextButtons/CancelButton";
import SubmitButton from "components/TextButtons/SubmitButton";
import Modal from "components/Modal/Modal";
// Styles
import "./CategoryForm.css";

const CategoryForm = (props) => {
  // Destructure props
  const {
    label,
    title,
    loading,
    handleInputChange,
    handleSubmit,
    handleCloseDialog,
  } = props;

  // Handle close form dialog
  const handleClose = (e) => {
    e.preventDefault();
    handleCloseDialog();
  };

  return (
    <Modal title={label} handleClose={handleCloseDialog}>
      <div className="category-dialog center">
        <form
          aria-label={label}
          id="category-form"
          className="column"
          onSubmit={handleSubmit}
        >
          <label htmlFor="categoryTitle">{label}</label>
          <input
            aria-label="Category Title"
            id="categoryTitle"
            data-testid="category-title-input"
            name="categoryTitle"
            value={title}
            placeholder="Title"
            onChange={handleInputChange}
            maxLength={50}
            required
            autoFocus
          />
          <div className="flex">
            <CancelButton buttonText="Cancel" onClick={handleClose} />
            <SubmitButton
              loading={loading}
              buttonText="Save"
              form="category-form"
              disabled={loading || title.length === 0}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

CategoryForm.propTypes = {
  label: PropTypes.oneOf(["Add Category", "Rename"]).isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default CategoryForm;
