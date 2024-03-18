// External imports
import { Suspense, lazy, useMemo, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
// Utilities
import { formatDateTime } from "../../../utils/dateUtils";
// Components
import TaskDetail from "./TaskDetail";
import TaskControls from "./TaskControls";
import LoadingModal from "../../Loading/LoadingModal";
import MoreTaskDetails from "./MoreTaskDetails";
import TaskCheckboxContainer from "../../../containers/Tasks/TaskCheckboxContainer";
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
    transition: false,
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
        transition: prev.color && prev.color !== color ? true : false,
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
        <TaskCheckboxContainer task={task} colorTransition={colorTransition} />
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
            <TaskDetail title="Start Date:" value={startDateFormatted} />
            <TaskDetail title="Finish Date:" value={finishDateFormatted} />
            {completedTime && (
              <TaskDetail title="Completed At:" value={completedAtFormatted} />
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
          handleClickEditTask={handleClickEditTask}
          setExpandDetailsTaskID={setExpandDetailsTaskID}
          expandDetailsTaskID={expandDetailsTaskID}
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
  setExpandDetailsTaskID: PropTypes.func.isRequired,
};

export default TaskListItem;
