import PropTypes from "prop-types";
import { useMemo } from "react";
// MUI Components
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// Styles
import "./TaskCheckbox.css";

const TaskCheckbox = (props) => {
  // Destructure props
  const { taskCompleted, checkboxProps, handleToggleCompleted } = props;
  const buttonAction = useMemo(
    () => `Mark as ${taskCompleted ? "Incomplete" : "Completed"}`,
    [taskCompleted]
  );

  return (
    <button
      aria-label={buttonAction}
      className={`center color ${checkboxProps.color} ${checkboxProps.changed}`}
      title={buttonAction}
      onClick={handleToggleCompleted}
    >
      <span className="center">
        {!taskCompleted && (
          <RadioButtonUncheckedIcon className="unfilled" fontSize="small" />
        )}
        <CheckCircleIcon
          className={`checkbox-icon ${taskCompleted ? "checked" : "unchecked"}`}
          sx={{ color: "green" }}
        />
      </span>
    </button>
  );
};

TaskCheckbox.propTypes = {
  taskCompleted: PropTypes.any,
  checkboxProps: PropTypes.shape({
    changed: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  handleToggleCompleted: PropTypes.func.isRequired,
};

export default TaskCheckbox;
