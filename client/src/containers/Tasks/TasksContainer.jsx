// External imports
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
// Assets
import { axiosWithCredentials } from "../../assets/axiosInstance";
// Custom hooks
import useElementOnScreen from "../../hooks/useElementOnScreen";
import useAuthRequest from "../../hooks/useAuthRequest";
// Utilities
import { getTasksRequestQueryFromURL } from "../../utils/tasksURLSearchParamsUtils";
// Context
import { TasksContext, TasksDispatchContext } from "../../context/TaskContext";
// Component
import Tasks from "../../components/Tasks/Tasks";

// Set the limit for tasks fetched at a time
const fetchLimit = 9;

const TasksContainer = () => {
  // React Router hook to get the current location
  const location = useLocation();
  // Custom hook for handling authenticated requests
  const [executeAuthRequest, loading, isOnline] = useAuthRequest();
  // Contexts and dispatch functions
  const tasks = useContext(TasksContext);
  const dispatchTasks = useContext(TasksDispatchContext);
  const dispatch = useDispatch();
  // State to manage the request query parameters
  const [requestQuery, setRequestQuery] = useState({
    page: 0,
    queryString: "",
  });

  // State to manage whether to load more tasks
  const [loadMore, setLoadMore] = useState(false);

  // Toggle Completed Checkbox
  const handleToggleCompleted = (task) => {
    const toggleCompleted = async () => {
      let value = null;
      if (!task.completedAt) value = new Date();
      dispatchTasks({
        type: "edit",
        payload: { ...task, completedAt: value },
      });

      await axiosWithCredentials.patch(`task/completed/${task._id}`, {
        completedAt: value,
      });
    };
    executeAuthRequest(toggleCompleted, "", [], false);
  };

  // Handle Delete Task
  const handleDelete = (task) => {
    const deleteTask = async () => {
      dispatchTasks({ type: "delete", payload: task._id });
      await axiosWithCredentials.delete(`task/${task._id}`);
      dispatch({
        type: "TASKS_COUNT",
        payload: { title: task.category, count: -1 },
      });
    };
    executeAuthRequest(deleteTask, "Deleted Task", [], false);
  };

  // Ref for loading indicator
  const ref = useRef(null);
  const [loadingRef, isVisible] = useElementOnScreen(
    {
      root: null,
      rootMargin: "2px",
      threshold: 0.1,
    },
    ref
  );

  // Fetch Tasks from the server
  const fetchTasks = async (ignore, queryString, page) => {
    const res = await axiosWithCredentials.get(
      `task?page=${page + 1}&limit=${fetchLimit}&${queryString}`
    );
    if (!ignore.value) {
      setRequestQuery((q) => ({ ...q, page: page + 1 }));
      dispatchTasks({
        type: page === 0 ? "initial_fetch" : "fetch_more",
        payload: res.data,
      });
      setLoadMore(res.data.length === fetchLimit ? true : false);
    }
  };

  // Fetch Tasks on initial load and when the location changes
  useEffect(() => {
    const ignore = { value: false };
    const queryStringFromURL = getTasksRequestQueryFromURL();
    executeAuthRequest(fetchTasks, "", [ignore, queryStringFromURL, 0]);
    setRequestQuery({ page: 0, queryString: queryStringFromURL });
    return () => {
      ignore.value = true;
    };
    // eslint-disable-next-line
  }, [location]);

  // Fetch More Tasks when the user scrolls and conditions are met
  useEffect(() => {
    const ignore = { value: false };
    const queryStringFromState = requestQuery.queryString;
    const queryStringFromURL = getTasksRequestQueryFromURL();

    const fetchMoreData = () => {
      queryStringFromState === queryStringFromURL &&
        isVisible &&
        isOnline &&
        !loading &&
        loadMore &&
        executeAuthRequest(fetchTasks, "", [
          ignore,
          queryStringFromState,
          requestQuery.page,
        ]);
    };
    fetchMoreData();

    // Cleanup function to handle component unmounting
    return () => {
      if (queryStringFromState !== getTasksRequestQueryFromURL()) {
        ignore.value = true;
      }
    };
    // eslint-disable-next-line
  }, [location, isOnline, isVisible, requestQuery, loadMore, loading]);

  // Memoized value to determine if tasks are transitioning
  const isTransitioning = useMemo(
    () => tasks !== null && requestQuery.page === 0 && loading,
    [loading, requestQuery, tasks]
  );

  // Render the Tasks component
  return (
    <Tasks
      key={tasks}
      tasks={tasks}
      loadingRef={loadingRef}
      handleToggleCompleted={handleToggleCompleted}
      handleDelete={handleDelete}
      isTransitioning={isTransitioning}
      loadMore={loadMore}
    />
  );
};

export default TasksContainer;
