import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./TaskCheckbox.css";

const TaskCheckbox = (props) => {
  // Destructure props
  const { task, handleToggleCompleted, colorTransition } = props;
  return (
    <button
      className={`center color ${colorTransition.color} ${colorTransition.transition}`}
      onClick={() => handleToggleCompleted(task)}
      title={`${task.completedAt ? "Unmark" : "Mark"} as completed`}
    >
      <span className="icon center">
        {task.completedAt ? (
          <CheckCircleIcon sx={{ color: "green" }} />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
      </span>
    </button>
  );
};

TaskCheckbox.propTypes = {
  task: PropTypes.object.isRequired,
  handleToggleCompleted: PropTypes.func.isRequired,
  colorTransition: PropTypes.shape({
    transition: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

export default TaskCheckbox;
