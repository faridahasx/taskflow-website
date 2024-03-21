// External imports
import PropTypes from "prop-types";
// MUI Components
import FeedbackIcon from "@mui/icons-material/Feedback";
// Styles
import "./styles.css";

const ExceptionContainer = (props) => {
  // Destructuring props
  const { message, Icon = FeedbackIcon } = props;

  return (
    <section
      role="alert"
      aria-live="assertive"
      aria-describedby="exception-message"
      className="center exception"
    >
      <div id="exception-message-container" className="column center">
        <Icon sx={{ fontSize: "25px", color: "grey" }} />
        <h1 id="exception-message">{message}</h1>
      </div>
    </section>
  );
};

ExceptionContainer.propTypes = {
  message: PropTypes.string.isRequired,
  Icon: PropTypes.object,
};

export default ExceptionContainer;
