// External imports
import PropTypes from "prop-types";
// Custom hooks
import useBodyOverflowHidden from "../../hooks/useBodyOverflowHidden";
// Components
import Modal from "../Modal/Modal";
import PortalComponent from "../PortalComponent";
import SubmitButton from "../TextButtons/SubmitButton";
import CancelButton from "../TextButtons/CancelButton";
import SortAndFiltersWrapper from "../SortAndFiltersWrapper/SortAndFiltersWrapper";
import CategoriesFilter from "./CategoriesFilter";
import DateRange from "./DateRange";
// Styles
import "./Filters.css";

const Filters = (props) => {
  // Destructuring props
  const {
    handleClose,
    handleSubmit,
    categories,
    selectedCategories,
    setSelectedCategories,
    startgte,
    setStartgte,
    startlte,
    setStartlte,
    finishgte,
    setFinishgte,
    finishlte,
    setFinishlte,
    handleClear,
  } = props;

  useBodyOverflowHidden();

  // Render component
  return (
    <PortalComponent>
      <Modal handleClose={handleClose}>
        <SortAndFiltersWrapper handleClose={handleClose} heading="Filters">
          <form id="filters-form" onSubmit={handleSubmit} data-testid="filters">
            <div id="filters-form-fields">
              <CategoriesFilter
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
              <DateRange
                label="Start range"
                start={startgte}
                end={startlte}
                setStart={setStartgte}
                setEnd={setStartlte}
              />
              <DateRange
                label="Finish range"
                start={finishgte}
                end={finishlte}
                setStart={setFinishgte}
                setEnd={setFinishlte}
              />
            </div>
            <div id="filters-bottom" className="flex">
              <CancelButton buttonText="Clear Filters" onClick={handleClear} />
              <SubmitButton
                buttonText="Apply"
                buttonProps={{ form: "filters-form" }}
              />
            </div>
          </form>
        </SortAndFiltersWrapper>
      </Modal>
    </PortalComponent>
  );
};

Filters.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  setStartgte: PropTypes.func.isRequired,
  setStartlte: PropTypes.func.isRequired,
  setFinishgte: PropTypes.func.isRequired,
  setFinishlte: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  categories: PropTypes.array,
  selectedCategories: PropTypes.array,
  startgte: PropTypes.any,
  startlte: PropTypes.any,
  finishgte: PropTypes.any,
  finishlte: PropTypes.any,
};

export default Filters;
