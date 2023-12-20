// External imports
import { Suspense, lazy, useMemo, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
// Utilities
import { formatDateTime } from "../../../utils/dateUtils";
// Components
import TaskCheckbox from "./TaskCheckbox";
import TaskDetail from "./TaskDetail";
import TaskControls from "./TaskControls";
import LoadingModal from "../../Loading/LoadingModal";
import MoreTaskDetails from "./MoreTaskDetails";
// Styles
import "./TaskListItem.css";

// Lazy-loaded components
const OpenTask = lazy(() =>
  import("../../../containers/Tasks/OpenTaskContainer")
);

const TaskListItem = (props) => {
  // Destructure props
  const {
    task,
    openEditTaskEditor,
    setOpenEditTaskEditor,
    openTask,
    setOpenTask,
    handleToggleCompleted,
    handleDelete,
    expandDetailsTaskID,
    setExpandDetailsTaskID,
  } = props;
  // Destructure task properties
  const {
    startDate,
    finishDate,
    completedAt,
    createdAt,
    updatedAt,
    title,
    category,
    _id,
  } = task;
  // State for color transition
  const [colorTransition, setColorTransition] = useState({
    transition: "",
    color: "",
  });

  // Memoized time values
  const startTime = useMemo(() => new Date(startDate).getTime(), [startDate]);
  const finishTime = useMemo(
    () => new Date(finishDate).getTime(),
    [finishDate]
  );
  const completedTime = useMemo(
    () => (completedAt ? new Date(completedAt).getTime() : null),
    [completedAt]
  );
  // Memoized date values
  const finishDateFormatted = useMemo(
    () => formatDateTime(finishDate),
    [finishDate]
  );

  const startDateFormatted = useMemo(
    () => formatDateTime(startDate),
    [startDate]
  );
  const completedAtFormatted = useMemo(
    () => (completedAt ? formatDateTime(completedAt) : "~"),
    [completedAt]
  );

  useLayoutEffect(() => {
    const updateColorTranisition = () => {
      const now = new Date().getTime();
      const color = completedTime
        ? "green"
        : now > finishTime
        ? "red"
        : startTime < now
        ? "blue"
        : "yellow";

      setColorTransition((prev) => ({
        transition: prev.color && prev.color !== color ? "t-color" : "",
        color: color,
      }));
    };

    updateColorTranisition();
  }, [startTime, finishTime, completedTime]);

  // Click handlers
  const handleClickEditTask = () => setOpenEditTaskEditor(task);
  const handleOpenTask = () => setOpenTask(task);
  const handleCloseOpenedTask = () => setOpenTask({});

  return (
    <li className="task-li">
      <div className="task-wrapper flex">
        <TaskCheckbox
          task={task}
          handleToggleCompleted={handleToggleCompleted}
          colorTransition={colorTransition}
        />

        <div
          className="column task-middle"
          data-testid="task-clickable"
          onClick={handleOpenTask}
        >
          <h3 className="flex" title={task.title}>
            {title}
          </h3>
          <div className="details-container column">
            <TaskDetail title="Category:" value={category} />
            <TaskDetail title="Start date:" value={startDateFormatted} />
            <TaskDetail title="Finish date:" value={finishDateFormatted} />
            {completedTime && (
              <TaskDetail title="Completed at:" value={completedAtFormatted} />
            )}
            {expandDetailsTaskID === _id && (
              <MoreTaskDetails
                startTime={startTime}
                finishTime={finishTime}
                createdAt={createdAt}
                updatedAt={updatedAt}
                completedTime={completedTime}
              />
            )}
          </div>
        </div>
        <TaskControls
          task={task}
          handleDelete={handleDelete}
          expandDetailsTaskID={expandDetailsTaskID}
          setExpandDetailsTaskID={setExpandDetailsTaskID}
          handleClickEditTask={handleClickEditTask}
        />
      </div>

      {openTask._id === _id && (
        <Suspense
          fallback={<LoadingModal handleClose={handleCloseOpenedTask} />}
        >
          <OpenTask
            task={task}
            openEditTaskEditor={openEditTaskEditor}
            handleClickEditTask={handleClickEditTask}
            handleCloseOpenedTask={handleCloseOpenedTask}
          />
        </Suspense>
      )}
    </li>
  );
};

TaskListItem.propTypes = {
  expandDetailsTaskID: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  openEditTaskEditor: PropTypes.object.isRequired,
  openTask: PropTypes.object.isRequired,
  setOpenEditTaskEditor: PropTypes.func.isRequired,
  setOpenTask: PropTypes.func.isRequired,
  handleToggleCompleted: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setExpandDetailsTaskID: PropTypes.func.isRequired,
};

export default TaskListItem;
