// External imports
import { useEffect } from "react";
import PropTypes from "prop-types";
// Components
import CircularLoading from "components/Loading/CircularLoading";
import EditButton from "components/IconButtons/EditButton";
import TryAgain from "components/IconButtons/TryAgain";
import TaskDialog from "./TaskDialog";
// Styles
import "./OpenTask.css";
import "./TaskForm/TextEditor/styles.css";

const OpenTask = (props) => {
  // Destructure props
  const {
    task,
    errorDuringFetch,
    openEditTaskEditor,
    handleOpenEditTaskEditor,
    handleCloseOpenedTask,
    handleTryFetchAgain,
  } = props;

  // useEffect to manage body class for overflow
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      !openEditTaskEditor && document.body.classList.remove("overflow-hidden");
    };
  }, [openEditTaskEditor]);

  return (
    <TaskDialog
      RightButton={<EditButton onClick={handleOpenEditTaskEditor} />}
      handleBackgroundClick={handleCloseOpenedTask}
      handleCloseClick={handleCloseOpenedTask}
    >
      <div className="open-task-wrapper">
        <h1 className="task-dialog-title flex">{task.title}</h1>
        <div className="center">
          {task.description === undefined ? (
            <div className="description-loading center">
              {errorDuringFetch ? (
                <TryAgain onClick={handleTryFetchAgain} />
              ) : (
                <CircularLoading />
              )}
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
  errorDuringFetch: PropTypes.any,
  openEditTaskEditor: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf(null),
  ]).isRequired,
  handleOpenEditTaskEditor: PropTypes.func.isRequired,
  handleCloseOpenedTask: PropTypes.func.isRequired,
  handleTryFetchAgain: PropTypes.func,
};

export default OpenTask;
