// External imports
import PropTypes from "prop-types";
// MUI Components
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// Components
import Footer from "../Layout/Footer";
// Styles
import "./styles.css";

const Error = (props) => {
  // Destructuring props
  const { errorMessage } = props;

  return (
    <section className="center error">
      <div
        id="error-message-container"
        className="column center"
        aria-errormessage="error message"
      >
        <WarningAmberIcon sx={{ fontSize: 40 }} />
        <h1 id="error-message">{errorMessage}</h1>
      </div>
      <Footer />
    </section>
  );
};

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default Error;
