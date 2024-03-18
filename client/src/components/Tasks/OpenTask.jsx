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
import TryAgain from "../IconButtons/TryAgain";

const OpenTask = (props) => {
  // Destructure props
  const {
    task,
    openEditTaskEditor,
    handleClickEditTask,
    handleCloseOpenedTask,
    errorDuringFetch,
    handleTryFetchAgain,
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
  openEditTaskEditor: PropTypes.object,
  handleClickEditTask: PropTypes.func.isRequired,
  handleCloseOpenedTask: PropTypes.func.isRequired,
  handleTryFetchAgain: PropTypes.func,
  errorDuringFetch: PropTypes.any,
};

export default OpenTask;
