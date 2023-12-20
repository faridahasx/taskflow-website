// External imports
import PropTypes from "prop-types";
import activateFilters from "../../constants/activateFilters";
import ActivateFiltersButton from "./ActivateFiltersButton";

const FiltersShortCut = ({ handleClick, activeFilter }) => {
  return (
    <ul className="flex active-filters-ul">
      {activateFilters.map((f) => (
        <li key={f.buttonTxt}>
          <ActivateFiltersButton
            handleClick={handleClick}
            buttonTxt={f.buttonTxt}
            value={f.value}
            isActive={activeFilter === f.value}
          />
        </li>
      ))}
    </ul>
  );
};

FiltersShortCut.propTypes = {
  handleClick: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default FiltersShortCut;
