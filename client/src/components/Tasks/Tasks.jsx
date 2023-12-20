// External imports
import { Suspense, lazy, useState } from "react";
import PropTypes from "prop-types";
// Custom hooks
import useNetworkStatus from "../../hooks/useNetworkStatus";
// Components
import OfflineContent from "../OfflineContent";
import LinearTransition from "../Loading/LinearTransition";
import LoadingModal from "../Loading/LoadingModal";
import CircularLoading from "../Loading/CircularLoading";
import Navigation from "../Navigation/Navigation";
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
    handleToggleCompleted,
    handleDelete,
    isTransitioning,
    loadMore,
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
                  handleToggleCompleted={handleToggleCompleted}
                  handleDelete={handleDelete}
                  expandDetailsTaskID={expandDetailsTaskID}
                  setExpandDetailsTaskID={setExpandDetailsTaskID}
                />
              ))}
            </ol>
          ) : (
            // Display message when there are no tasks
            <TasksEmpty>No tasks</TasksEmpty>
          )
        ) : (
          <TasksEmpty>
            {!isOnline ? (
              <OfflineContent />
            ) : (
              <CircularLoading data-testid="loading-initial-tasks-indicator" />
            )}
          </TasksEmpty>
        )}

        {isTransitioning === true ? (
          <LinearTransition />
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
  handleToggleCompleted: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isTransitioning: PropTypes.bool.isRequired,
  loadMore: PropTypes.bool.isRequired,
};

export default Tasks;
