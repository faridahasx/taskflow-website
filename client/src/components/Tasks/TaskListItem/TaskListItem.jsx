// External imports
import { Suspense, lazy, useMemo, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
// Utilities
import { formatDateTime } from "utils/dateUtils";
// Components
import ModalLoading from "components/Loading/ModalLoading";
import TaskCheckboxContainer from "containers/Tasks/TaskCheckboxContainer";
import TaskDetail from "./TaskDetail";
import TaskControls from "./TaskControls";
import MoreTaskDetails from "./MoreTaskDetails";
// Styles
import "./TaskListItem.css";

// Lazy-loaded components
const OpenTask = lazy(() => import("containers/Tasks/OpenTaskContainer"));

const TaskListItem = (props) => {
  // Destructure props
  const {
    task,
    expandDetailsTaskID,
    openEditTaskEditor,
    openTask,
    setOpenEditTaskEditor,
    setOpenTask,
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
  const [checkboxProps, setCheckboxProps] = useState({
    changed: "",
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

      setCheckboxProps((prev) => ({
        changed:
          prev.color && prev.color !== color
            ? "checkbox-changed"
            : "checkbox-initial",
        color: color,
      }));
    };

    updateColorTranisition();
  }, [startTime, finishTime, completedTime]);

  // Click handlers
  const handleOpenEditTaskEditor = () => setOpenEditTaskEditor(task);
  const handleOpenTask = () => setOpenTask(task);
  const handleCloseOpenedTask = () => setOpenTask(null);

  return (
    <li className="task-li">
      <div className="task-wrapper flex">
        <TaskCheckboxContainer task={task} checkboxProps={checkboxProps} />
        <div
          data-testid="task-clickable"
          className="column task-middle"
          onClick={handleOpenTask}
        >
          <h3 className="flex" title={task.title}>
            {title}
          </h3>
          <div className="details-container column">
            <TaskDetail title="Category:" value={category} />
            <TaskDetail title="Start:" value={startDateFormatted} />
            <TaskDetail title="Finish:" value={finishDateFormatted} />
            {completedTime && (
              <TaskDetail title="Completion:" value={completedAtFormatted} />
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
          expandDetailsTaskID={expandDetailsTaskID}
          setExpandDetailsTaskID={setExpandDetailsTaskID}
          handleOpenEditTaskEditor={handleOpenEditTaskEditor}
        />
      </div>

      {openTask && openTask._id === _id && (
        <Suspense
          fallback={<ModalLoading handleClose={handleCloseOpenedTask} />}
        >
          <OpenTask
            task={task}
            openEditTaskEditor={openEditTaskEditor}
            handleOpenEditTaskEditor={handleOpenEditTaskEditor}
            handleCloseOpenedTask={handleCloseOpenedTask}
          />
        </Suspense>
      )}
    </li>
  );
};

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired,
  expandDetailsTaskID: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(null),
  ]).isRequired,
  openEditTaskEditor: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf(null),
  ]).isRequired,
  openTask: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf(null)])
    .isRequired,
  setOpenEditTaskEditor: PropTypes.func.isRequired,
  setOpenTask: PropTypes.func.isRequired,
  setExpandDetailsTaskID: PropTypes.func.isRequired,
};

export default TaskListItem;
