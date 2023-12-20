// External imports
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// MUI components
import { Close, LoginOutlined } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
// Components
import LogoutButtonContainer from "../../containers/LogoutButtonContainer";
import IconButton from "../IconButtons/IconButton";
import Logo from "../Logo/Logo";
// Styles
import "./Header.css";

const Header = ({
  categoriesOpen,
  setCategoriesOpen,
  isLogged,
  handleDisplayAuthDialog,
}) => {
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
          Icon={categoriesOpen ? <Close /> : <MenuIcon />}
          buttonProps={{
            title: categoriesOpen ? "Close categories" : "Open categories",
            onClick: handleToggleCategoriesOpen,
          }}
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
          data-testid="header-stats-link"
          className="icon"
          title="Stats"
          to="/stats"
          onClick={(e) => handleLinkNavigation(e, "/stats")}
        >
          <BarChartIcon />
        </Link>
        {isLogged === true ? (
          <LogoutButtonContainer />
        ) : (
          <IconButton
            Icon={<LoginOutlined />}
            buttonProps={{
              title: "Sign In",
              onClick: handleDisplayAuthDialog,
            }}
          />
        )}
      </span>
    </header>
  );
};

Header.propTypes = {
  categoriesOpen: PropTypes.bool.isRequired,
  setCategoriesOpen: PropTypes.func.isRequired,
};

export default Header;
