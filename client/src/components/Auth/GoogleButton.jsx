import PropTypes from "prop-types";
import GoogleIcon from "@mui/icons-material/Google";
import "./GoogleButton.css";

const GoogleButton = ({ handleContinueWithGoogle }) => {
  return (
    <button
      id="google-btn"
      className="center"
      onClick={handleContinueWithGoogle}
    >
      <span className="center">
        <GoogleIcon />
      </span>
      <span className="center">Continue with Google</span>
    </button>
  );
};

GoogleButton.propTypes = {
  handleContinueWithGoogle: PropTypes.func.isRequired,
};

export default GoogleButton;
