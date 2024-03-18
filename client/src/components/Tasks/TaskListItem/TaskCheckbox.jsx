import PropTypes from "prop-types";
// MUI Components
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// Styles
import "./TaskCheckbox.css";

const TaskCheckbox = (props) => {
  // Destructure props
  const { taskCompleted, handleToggleCompleted, colorTransition } = props;

  return (
    <button
      className={`center color ${colorTransition.color} ${
        colorTransition.transition ? "color-transition" : "no-transtion"
      }`}
      onClick={handleToggleCompleted}
      title={`${taskCompleted ? "Unmark" : "Mark"} as completed`}
    >
      <span className="center">
        {!taskCompleted && (
          <RadioButtonUncheckedIcon fontSize="small" className="unfilled" />
        )}

        <CheckCircleIcon
          sx={{ color: "green" }}
          className={`checkbox-icon ${taskCompleted ? "checked" : "unchecked"}`}
        />
      </span>
    </button>
  );
};

TaskCheckbox.propTypes = {
  taskCompleted: PropTypes.any.isRequired,
  handleToggleCompleted: PropTypes.func.isRequired,
  colorTransition: PropTypes.shape({
    transition: PropTypes.bool,
    color: PropTypes.string,
  }).isRequired,
};

export default TaskCheckbox;
