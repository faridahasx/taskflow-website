// External imports
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// MUI components
import { Close } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
// Components
import LogoutButtonContainer from "containers/LogoutButtonContainer";
import IconButton from "components/IconButtons/IconButton";
import Logo from "components/Logo/Logo";
// Styles
import "./Header.css";

const Header = ({ categoriesOpen, setCategoriesOpen }) => {
  // React Router hooks
  const location = useLocation();
  const navigate = useNavigate();
  const handleToggleCategoriesOpen = () => setCategoriesOpen(!categoriesOpen);

  // Close categories slider if open before navigating
  const handleLinkNavigation = (e, to) => {
    e.preventDefault();
    navigate(to);
    categoriesOpen && setCategoriesOpen(false);
  };

  useEffect(() => {
    categoriesOpen && setCategoriesOpen(false);
  }, [location]);

  return (
    <header id="header" className="flex">
      <span id="header-first" className="flex">
        <IconButton
          aria-label={categoriesOpen ? "Close Categories" : "Open Categories"}
          title={categoriesOpen ? "Close Categories" : "Open Categories"}
          onClick={handleToggleCategoriesOpen}
          Icon={categoriesOpen ? <Close /> : <MenuIcon />}
        />
        <Link
          data-testid="header-home-link"
          className="center"
          onClick={(e) => handleLinkNavigation(e, "/")}
          to="/"
        >
          <Logo />
        </Link>
      </span>
      <span id="header-second" className="flex">
        <Link
          data-testid="header-analytics-link"
          className="icon"
          title="Task Analytics"
          to="/analytics"
          onClick={(e) => handleLinkNavigation(e, "/analytics")}
        >
          <BarChartIcon />
        </Link>
        <LogoutButtonContainer />
      </span>
    </header>
  );
};

Header.propTypes = {
  categoriesOpen: PropTypes.bool.isRequired,
  setCategoriesOpen: PropTypes.func.isRequired,
};

export default Header;
