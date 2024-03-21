// External imports
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Utils
import { formatTaskAnalytics } from "utils/formatTaskAnalytics";
import { getTaskAnalyticsRequestQueryFromURL } from "utils/tasksURLSearchParamsUtils";
import { axiosWithCredentials } from "utils/axiosInstance";
import { UNKNOWN_ERROR } from "constants/alertMessages";
// Custom hooks
import useMakeServerRequest from "hooks/useMakeServerRequest";
import useNetworkStatus from "hooks/useNetworkStatus";
// Component
import TaskAnalytics from "components/TaskAnalytics/TaskAnalytics";

const TaskAnalyticsContainer = () => {
  // Get the current location object from React Router
  const isLogged = useSelector((state) => state.auth.isLogged);
  const isOnline = useNetworkStatus();
  const location = useLocation();
  const { executeServerRequest, error, handleTryAgain } =
    useMakeServerRequest();
  const [defaultDateRange, setDefaultDateRange] = useState({
    start: "",
    end: "",
  });
  const { start, end } = defaultDateRange;
  const [taskAnalytics, setTaksAnalytics] = useState(null);

  useEffect(() => {
    // To ignore state updates on an unmounted component
    const ignore = { value: false };
    // Function to fetch statistics data
    const fetchAnalytics = async () => {
      // Extract query parameters from the URL
      let [queryString, new_start, new_end] =
        getTaskAnalyticsRequestQueryFromURL();
      // Make a request to the server to fetch statistics
      const res = await axiosWithCredentials.get(`stats?${queryString}`);

      if (new_start !== start) {
        setDefaultDateRange({
          start: new_start,
          end: new_end,
        });
      }

      if (!ignore.value) {
        setTaksAnalytics(
          res.data.length === 0 ? 0 : formatTaskAnalytics(res.data[0])
        );
      }
    };
    // Execute the authenticated request and fetch analytics on component mount
    !error &&
      executeServerRequest({
        callback: fetchAnalytics,
        fallbackErrorMessage: UNKNOWN_ERROR,
      });
    // Cleanup funtion to avoid state updates on an unmounted component
    return () => (ignore.value = true);
    // eslint-disable-next-line
  }, [location, isLogged, isOnline, error]);

  // Render TaskAnalytics component with necessary props
  return (
    <TaskAnalytics
      start={start}
      end={end}
      taskAnalytics={taskAnalytics}
      errorDuringFetch={error}
      handleTryAgain={handleTryAgain}
    />
  );
};

export default TaskAnalyticsContainer;
