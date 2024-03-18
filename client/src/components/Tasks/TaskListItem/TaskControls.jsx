// External imports
import PropTypes from "prop-types";
// MUI Components
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Components
import EditButton from "../../IconButtons/EditButton";
import IconButton from "../../IconButtons/IconButton";
import DeleteTaskButtonContainer from "../../../containers/Tasks/DeleteTaskButtonContainer";
// Styles
import "./TaskControls.css";

const TaskControls = (props) => {
  // Destructure props
  const {
    task,
    handleClickEditTask,
    expandDetailsTaskID,
    setExpandDetailsTaskID,
  } = props;

  // Function to expand task details
  const handleExpandTaskDetails = () => {
    setExpandDetailsTaskID((prev) => (prev === task._id ? "" : task._id));
  };

  return (
    <div className="column task-controls">
      <IconButton
        Icon={<ExpandMoreIcon />}
        title={expandDetailsTaskID === task._id ? "Collapse" : "Expand"}
        className={`expand ${
          expandDetailsTaskID === task._id ? "collapse" : ""
        }`}
        onClick={handleExpandTaskDetails}
      />
      {expandDetailsTaskID === task._id && (
        <>
          <EditButton onClick={handleClickEditTask} />
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
  handleClickEditTask: PropTypes.func.isRequired,
  setExpandDetailsTaskID: PropTypes.func.isRequired,
  expandDetailsTaskID: PropTypes.string.isRequired,
};

export default TaskControls;
