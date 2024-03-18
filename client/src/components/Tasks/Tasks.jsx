// External imports
import { Suspense, lazy, useState } from "react";
import PropTypes from "prop-types";
// MUI Components
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
// Custom hooks
import useNetworkStatus from "../../hooks/useNetworkStatus";
// Components
import OfflineContent from "../OfflineContent";
import LinearTransition from "../Loading/LinearTransition";
import LoadingModal from "../Loading/LoadingModal";
import CircularLoading from "../Loading/CircularLoading";
import Navigation from "../Navigation/Navigation";
import TryAgain from "../IconButtons/TryAgain";
import ExceptionContainer from "../Error/ExceptionContainer";
import TaskListItem from "./TaskListItem/TaskListItem";
import TasksEmpty from "./TasksEmpty";
// Styles
import "./Tasks.css";

// Lazy-loaded components
const AddTaskForm = lazy(() => import("../../containers/Tasks/AddTaskForm"));
const EditTaskForm = lazy(() => import("../../containers/Tasks/EditTaskForm"));

const Tasks = (props) => {
  // Destructure props
  const {
    tasks,
    loadingRef,
    isTransitioning,
    loadMore,
    errorDuringFetch,
    handleTryAgain,
  } = props;
  // Local state
  const [openEditTaskEditor, setOpenEditTaskEditor] = useState({});
  const [openAddTaskEditor, setOpenAddTaskEditor] = useState(false);
  const [openTask, setOpenTask] = useState({});
  const [expandDetailsTaskID, setExpandDetailsTaskID] = useState("");

  const isOnline = useNetworkStatus();

  // Event handlers
  const handleToggleOpenTaskForm = () => {
    setOpenAddTaskEditor(!openAddTaskEditor);
  };
  const handleCloseAddTaskEditor = () => setOpenAddTaskEditor("");
  const handleCloseEditTaskEditor = () => setOpenEditTaskEditor({});

  return (
    <section id="tasks-wrapper" className="column">
      <div id="tasks" className="column">
        <Navigation handleToggleOpenTaskForm={handleToggleOpenTaskForm} />
        {/* Render task list or display appropriate messages */}
        {tasks !== null ? (
          tasks.length > 0 ? (
            <ol id="tasks-list" className="column">
              {tasks.map((t) => (
                // TaskListItem component for each task
                <TaskListItem
                  key={t._id}
                  task={t}
                  openEditTaskEditor={openEditTaskEditor}
                  setOpenEditTaskEditor={setOpenEditTaskEditor}
                  openTask={openTask}
                  setOpenTask={setOpenTask}
                  expandDetailsTaskID={expandDetailsTaskID}
                  setExpandDetailsTaskID={setExpandDetailsTaskID}
                />
              ))}
            </ol>
          ) : (
            // Display message when there are no tasks
            <TasksEmpty>
              <ExceptionContainer message="No Task" Icon={SplitscreenIcon} />
            </TasksEmpty>
          )
        ) : (
          <TasksEmpty>
            {!isOnline ? (
              <OfflineContent />
            ) : errorDuringFetch ? (
              <ExceptionContainer message="Something went wrong" />
            ) : (
              <CircularLoading data-testid="loading-initial-tasks-indicator" />
            )}
          </TasksEmpty>
        )}

        {isTransitioning === true ? (
          <LinearTransition />
        ) : tasks && errorDuringFetch ? (
          <TryAgain onClick={handleTryAgain} />
        ) : (
          // Display loading indicator for more tasks
          loadMore && (
            <span
              className="center"
              id="loading-tasks"
              data-testid="loading-more-tasks-indicator"
              ref={loadingRef}
            >
              <CircularLoading />
            </span>
          )
        )}
      </div>
      {/* Conditional rendering of AddTaskForm or EditTaskForm */}
      {openAddTaskEditor ? (
        <Suspense
          fallback={
            <LoadingModal handleClose={() => setOpenAddTaskEditor(false)} />
          }
        >
          <AddTaskForm handleCloseEditor={handleCloseAddTaskEditor} />
        </Suspense>
      ) : (
        openEditTaskEditor._id && (
          <Suspense
            fallback={
              <LoadingModal handleClose={() => setOpenEditTaskEditor({})} />
            }
          >
            <EditTaskForm
              handleCloseEditor={handleCloseEditTaskEditor}
              task={openEditTaskEditor}
            />
          </Suspense>
        )
      )}
    </section>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf([null])]),
  loadingRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  errorDuringFetch: PropTypes.bool.isRequired,
  isTransitioning: PropTypes.bool.isRequired,
  loadMore: PropTypes.bool.isRequired,
  handleTryAgain: PropTypes.func.isRequired,
};

export default Tasks;
