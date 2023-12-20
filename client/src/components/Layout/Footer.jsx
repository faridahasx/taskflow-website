// External imports
import { Link } from "react-router-dom";
// Components
import Logo from "../Logo/Logo";
// Styles
import "./Footer.css";
const DEV_CONTACT_URL = process.env.REACT_APP_DEVELOPER_CONTACT_URL;

const Footer = () => {
  return (
    <footer className="center">
      <div id="footer-div" className="center">
        <Link
          id="footer-logo-link"
          to="/"
          aria-label="Go to home page"
          title="Home"
        >
          <Logo />
        </Link>
        <Link
          id="dev-link"
          to={DEV_CONTACT_URL}
          target="_blank"
          title="Contact the developer"
        >
          Contact the developer
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
