// External imports
import PropTypes from "prop-types";
// MUI components
import { Add } from "@mui/icons-material";
// Custom hooks
import useScrollDirection from "hooks/useScrollDirection";
// Components
import FiltersShortCutContainer from "containers/Tasks/FiltersShortCutContainer";
import IconButton from "components/IconButtons/IconButton";
import SearchNav from "components/NavigationItem/SearchNav";
import FiltersNav from "components/NavigationItem/FiltersNav";
import SortNav from "components/NavigationItem/SortNav";
// Styles
import "./Navigation.css";

// Navigation component to handle tasks navigation
const Navigation = (props) => {
  // Destructure props
  const { handleToggleOpenTaskForm } = props;

  // Custom hook to detect scroll direction
  const scrollDirection = useScrollDirection(50);

  return (
    <nav data-testid="nav" className={"flex nav " + scrollDirection}>
      <div id="nav-methods" className="column">
        <div className="flex">
          <ul className="flex">
            <li>
              <SearchNav />
            </li>
            <li>
              <FiltersNav />
            </li>
            <li>
              <SortNav />
            </li>
          </ul>
          <IconButton
            className="add-task-btn"
            title="Add task"
            onClick={handleToggleOpenTaskForm}
            Icon={<Add />}
          />
        </div>
        <FiltersShortCutContainer />
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  handleToggleOpenTaskForm: PropTypes.func.isRequired,
};

export default Navigation;
