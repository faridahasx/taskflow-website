// External imports
import { Suspense, lazy, useState } from "react";
import PropTypes from "prop-types";
// MUI Components
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
// Custom hooks
import useNetworkStatus from "hooks/useNetworkStatus";
// Components
import OfflineContent from "components/OfflineContent";
import LinearTransition from "components/Loading/LinearTransition";
import ModalLoading from "components/Loading/ModalLoading";
import CircularLoading from "components/Loading/CircularLoading";
import Navigation from "components/Navigation/Navigation";
import TryAgain from "components/IconButtons/TryAgain";
import ExceptionContainer from "components/Error/ExceptionContainer";
import TaskListItem from "./TaskListItem/TaskListItem";
// Styles
import "./Tasks.css";

// Lazy-loaded components
const AddTaskForm = lazy(() => import("containers/Tasks/AddTaskForm"));
const EditTaskForm = lazy(() => import("containers/Tasks/EditTaskForm"));

const Tasks = (props) => {
  // Destructure props
  const {
    errorDuringFetch,
    isTransitioning,
    loadMore,
    tasks,
    loadingRef,
    handleTryAgain,
  } = props;
  // Local state
  const [openAddTaskEditor, setOpenAddTaskEditor] = useState(false);
  const [openEditTaskEditor, setOpenEditTaskEditor] = useState(null);
  const [openTask, setOpenTask] = useState(null);
  const [expandDetailsTaskID, setExpandDetailsTaskID] = useState(null);

  const isOnline = useNetworkStatus();

  // Event handlers
  const handleToggleOpenTaskForm = () =>
    setOpenAddTaskEditor(!openAddTaskEditor);
  const handleCloseAddTaskEditor = () => setOpenAddTaskEditor(false);
  const handleCloseEditTaskEditor = () => setOpenEditTaskEditor(null);

  return (
    <section id="tasks-wrapper" className="column">
      <div id="tasks" className="column">
        <Navigation handleToggleOpenTaskForm={handleToggleOpenTaskForm} />

        {/* Display appropriate messages when there are no tasks */}
        {(tasks === null || (tasks && tasks.length === 0)) && (
          <span className="center tasks-empty">
            {tasks && tasks.length === 0 ? (
              <ExceptionContainer message="No Task" Icon={SplitscreenIcon} />
            ) : !isOnline ? (
              <OfflineContent />
            ) : errorDuringFetch ? (
              <ExceptionContainer message="Something went wrong" />
            ) : (
              <CircularLoading
                role="alert"
                aria-live="assertive"
                aria-label="Fetching Tasks"
                data-testid="loading-initial-tasks-indicator"
              />
            )}
          </span>
        )}

        {/* Render tasks */}
        {tasks && tasks.length > 0 && (
          <ol aria-label="Task List" id="tasks-list" className="column">
            {tasks.map((t) => (
              // TaskListItem component for each task
              <TaskListItem
                key={t._id}
                task={t}
                expandDetailsTaskID={expandDetailsTaskID}
                openEditTaskEditor={openEditTaskEditor}
                openTask={openTask}
                setOpenEditTaskEditor={setOpenEditTaskEditor}
                setOpenTask={setOpenTask}
                setExpandDetailsTaskID={setExpandDetailsTaskID}
              />
            ))}
          </ol>
        )}

        {/* Display loading indicators */}
        {isTransitioning === true ? (
          <LinearTransition aria-label="Fetching Tasks" />
        ) : tasks && errorDuringFetch ? (
          <TryAgain onClick={handleTryAgain} />
        ) : (
          // Display loading indicator for more tasks
          loadMore && (
            <span
              aria-label="Fetching More Tasks"
              id="loading-tasks"
              data-testid="loading-more-tasks-indicator"
              className="center"
              ref={loadingRef}
            >
              <CircularLoading />
            </span>
          )
        )}
      </div>
      {/* Conditional rendering of AddTaskForm or EditTaskForm */}

      <Suspense
        fallback={<ModalLoading handleClose={handleCloseAddTaskEditor} />}
      >
        {openAddTaskEditor && (
          <AddTaskForm handleCloseEditor={handleCloseAddTaskEditor} />
        )}
      </Suspense>
      <Suspense
        fallback={<ModalLoading handleClose={handleCloseEditTaskEditor} />}
      >
        {openEditTaskEditor && (
          <EditTaskForm
            handleCloseEditor={handleCloseEditTaskEditor}
            task={openEditTaskEditor}
          />
        )}
      </Suspense>
    </section>
  );
};

Tasks.propTypes = {
  errorDuringFetch: PropTypes.bool.isRequired,
  isTransitioning: PropTypes.bool.isRequired,
  loadMore: PropTypes.bool.isRequired,
  tasks: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf([null])]),
  loadingRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  handleTryAgain: PropTypes.func.isRequired,
};

export default Tasks;
