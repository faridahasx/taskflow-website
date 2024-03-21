// External imports
import PropTypes from "prop-types";
// Custom hooks
import useBodyOverflowHidden from "hooks/useBodyOverflowHidden";
// Components
import Modal from "components/Modal/Modal";
import PortalComponent from "components/PortalComponent";
import SubmitButton from "components/TextButtons/SubmitButton";
import CancelButton from "components/TextButtons/CancelButton";
import SortAndFiltersWrapper from "components/SortAndFiltersWrapper/SortAndFiltersWrapper";
import CategoriesFilter from "./CategoriesFilter";
import DateRange from "./DateRange";
// Styles
import "./Filters.css";

const Filters = (props) => {
  // Destructuring props
  const {
    startlte,
    startgte,
    finishlte,
    finishgte,
    categories,
    selectedCategories,
    setSelectedCategories,
    setStartlte,
    setStartgte,
    setFinishgte,
    setFinishlte,
    handleSubmit,
    handleClear,
    handleClose,
  } = props;

  useBodyOverflowHidden();

  // Render component
  return (
    <PortalComponent>
      <Modal aria-label="Filter Tasks" handleClose={handleClose}>
        <SortAndFiltersWrapper handleClose={handleClose} heading="Filters">
          <form id="filters-form" data-testid="filters" onSubmit={handleSubmit}>
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
              <CancelButton
                aria-label="Clear Filters"
                buttonText="Clear"
                onClick={handleClear}
              />
              <SubmitButton
                aria-label="Apply Filters"
                buttonText="Apply"
                form="filters-form"
              />
            </div>
          </form>
        </SortAndFiltersWrapper>
      </Modal>
    </PortalComponent>
  );
};

Filters.propTypes = {
  startlte: PropTypes.any,
  startgte: PropTypes.any,
  finishlte: PropTypes.any,
  finishgte: PropTypes.any,
  categories: PropTypes.array,
  selectedCategories: PropTypes.array,
  setSelectedCategories: PropTypes.func.isRequired,
  setStartgte: PropTypes.func.isRequired,
  setStartlte: PropTypes.func.isRequired,
  setFinishgte: PropTypes.func.isRequired,
  setFinishlte: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Filters;
