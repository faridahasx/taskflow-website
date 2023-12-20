// External imports
import PropTypes from "prop-types";
// MUI components
import { Add } from "@mui/icons-material";
// Custom hooks
import useScrollDirection from "../../hooks/useScrollDirection";
// Components
import FiltersShortCutContainer from "../../containers/Tasks/FiltersShortCutContainer";
import IconButton from "../IconButtons/IconButton";
import SearchNav from "../NavigationItem/SearchNav";
import FiltersNav from "../NavigationItem/FiltersNav";
import SortNav from "../NavigationItem/SortNav";
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
            Icon={<Add />}
            buttonProps={{
              title: "Add Task",
              onClick: handleToggleOpenTaskForm,
              className: "add-task-btn",
            }}
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
