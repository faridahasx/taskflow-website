// External imports
import { useContext, useEffect, useMemo, useRef, useState } from "react";
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
  const { executeAuthRequest, loading, isOnline, error, handleTryAgain } =
    useAuthRequest();
  // Contexts and dispatch functions
  const tasks = useContext(TasksContext);
  const dispatchTasks = useContext(TasksDispatchContext);
  // State to manage the request query parameters
  const [requestQuery, setRequestQuery] = useState({
    page: 0,
    queryString: "",
  });

  // State to manage whether to load more tasks
  const [loadMore, setLoadMore] = useState(false);
  // Ref for loading indicator
  const ref = useRef(null);
  // Track visibility of ref to load more tasks
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
      `task?page=${page + 1}&limit=${fetchLimit}${queryString}`
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

  // Fetch Tasks on initial load or on the location change
  useEffect(() => {
    const ignore = { value: false };
    const queryStringFromURL = getTasksRequestQueryFromURL();
    executeAuthRequest({
      callback: fetchTasks,
      callbackArgs: [ignore, queryStringFromURL, 0],
      errorMessage: "Failed to fetch tasks",
    });
    setRequestQuery({ page: 0, queryString: queryStringFromURL });

    return () => {
      ignore.value = true;
    };
    // eslint-disable-next-line
  }, [location]);

  // Fetch More Tasks when the user scrolls and other conditions are met
  useEffect(() => {
    const ignore = { value: false };
    const queryStringFromState = requestQuery.queryString;
    const queryStringFromURL = getTasksRequestQueryFromURL();
    const fetchMoreData = () => {
      queryStringFromState === queryStringFromURL &&
        isVisible &&
        isOnline &&
        !loading &&
        !error &&
        loadMore &&
        executeAuthRequest({
          callback: fetchTasks,
          callbackArgs: [ignore, queryStringFromState, requestQuery.page],
          errorMessage: null,
        });
    };
    fetchMoreData();

    // Cleanup function to handle component unmounting
    return () => {
      if (queryStringFromState !== getTasksRequestQueryFromURL()) {
        ignore.value = true;
      }
    };
    // eslint-disable-next-line
  }, [location, isOnline, isVisible, requestQuery, loadMore, loading, error]);

  // Memoized value to determine if tasks are transitioning due to change in search params
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
      isTransitioning={isTransitioning}
      loadMore={loadMore}
      errorDuringFetch={error}
      handleTryAgain={handleTryAgain}
    />
  );
};

export default TasksContainer;
