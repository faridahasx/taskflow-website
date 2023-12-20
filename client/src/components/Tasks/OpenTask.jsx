// External imports
import { useEffect } from "react";
import PropTypes from "prop-types";
// Components
import CircularLoading from "../Loading/CircularLoading";
import EditButton from "../IconButtons/EditButton";
import TaskDialog from "./TaskDialog";
// Styles
import "./OpenTask.css";
import "./TaskForm/TextEditor/styles.css";

const OpenTask = (props) => {
  // Destructure props
  const {
    task,
    openEditTaskEditor,
    handleClickEditTask,
    handleCloseOpenedTask,
    loading,
  } = props;

  // useEffect to manage body class for overflow
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      !openEditTaskEditor._id &&
        document.body.classList.remove("overflow-hidden");
    };
  }, [openEditTaskEditor]);

  return (
    <TaskDialog
      handleBackgroundClick={handleCloseOpenedTask}
      handleCloseClick={handleCloseOpenedTask}
      SecondButton={<EditButton onClick={handleClickEditTask} />}
    >
      <div className="open-task-wrapper">
        <h1 className="task-dialog-title flex">{task.title}</h1>
        <div className="center">
          {loading ? (
            <div className="description-loading center">
              <CircularLoading />
            </div>
          ) : (
            <section
              className="task-description"
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
          )}
        </div>
      </div>
    </TaskDialog>
  );
};

OpenTask.propTypes = {
  task: PropTypes.object.isRequired,
  openEditTaskEditor: PropTypes.object,
  handleClickEditTask: PropTypes.func.isRequired,
  handleCloseOpenedTask: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default OpenTask;
