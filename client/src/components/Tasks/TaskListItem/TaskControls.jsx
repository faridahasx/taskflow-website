// External imports
import PropTypes from "prop-types";
import { useMemo } from "react";
// MUI Components
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Components
import EditButton from "components/IconButtons/EditButton";
import IconButton from "components/IconButtons/IconButton";
import DeleteTaskButtonContainer from "containers/Tasks/DeleteTaskButtonContainer";
// Styles
import "./TaskControls.css";

const TaskControls = (props) => {
  // Destructure props
  const {
    task,
    expandDetailsTaskID,
    setExpandDetailsTaskID,
    handleOpenEditTaskEditor,
  } = props;
  const action = useMemo(
    () => (expandDetailsTaskID === task._id ? "Hide Options" : "Show Options"),
    [expandDetailsTaskID, task._id]
  );

  // Function to expand task details
  const handleExpandTaskDetails = () => {
    setExpandDetailsTaskID((prev) => (prev === task._id ? "" : task._id));
  };

  return (
    <div className="column task-controls">
      <IconButton
        aria-label={action}
        className={`expand ${
          expandDetailsTaskID === task._id ? "collapse" : ""
        }`}
        title={action}
        Icon={<ExpandMoreIcon />}
        onClick={handleExpandTaskDetails}
      />
      {expandDetailsTaskID === task._id && (
        <>
          <EditButton
            aria-label="Edit Task"
            onClick={handleOpenEditTaskEditor}
          />
          <DeleteTaskButtonContainer
            taskID={task._id}
            taskCategory={task.category}
          />
        </>
      )}
    </div>
  );
};

TaskControls.propTypes = {
  task: PropTypes.object.isRequired,
  expandDetailsTaskID: PropTypes.string.isRequired,
  setExpandDetailsTaskID: PropTypes.func.isRequired,
  handleOpenEditTaskEditor: PropTypes.func.isRequired,
};

export default TaskControls;
