// External imports
import PropTypes from "prop-types";
import activateFilters from "constants/activateFilters";
import ActivateFiltersButton from "./ActivateFiltersButton";

const FiltersShortCut = ({ activeFilter, handleClick }) => {
  return (
    <ul className="flex active-filters-ul">
      {activateFilters.map((f) => (
        <li key={f.buttonTxt}>
          <ActivateFiltersButton
            buttonTxt={f.buttonTxt}
            value={f.value}
            isActive={activeFilter === f.value}
            handleClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
};

FiltersShortCut.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FiltersShortCut;
