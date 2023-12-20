// External imports
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Custom hooks
import useAuthRequest from "../hooks/useAuthRequest";
import useNetworkStatus from "../hooks/useNetworkStatus";
// Utility functions
import { formatStats } from "../utils/formatStats";
import { getStatsRequestQueryFromURL } from "../utils/tasksURLSearchParamsUtils";
// Assets
import { axiosWithCredentials } from "../assets/axiosInstance";
// Component
import StatsWrapper from "../components/Stats/StatsWrapper";
import { useSelector } from "react-redux";

const StatsContainer = () => {
  // Get the current location object from React Router
  const isLogged = useSelector((state) => state.auth.isLogged);
  const isOnline = useNetworkStatus();
  const location = useLocation();
  const [executeAuthRequest, loading] = useAuthRequest();
  const [defaultDateRange, setDefaultDateRange] = useState({
    start: "",
    end: "",
  });
  const { start, end } = defaultDateRange;

  const [stats, setStats] = useState(null);

  useEffect(() => {
    // To ignore state updates on an unmounted component
    const ignore = { value: false };
    // Function to fetch statistics data
    const fetchStats = async () => {
      // Extract query parameters from the URL
      let [queryString, new_start, new_end] = getStatsRequestQueryFromURL();
      // Make a request to the server to fetch statistics
      const res = await axiosWithCredentials.get(`stats?${queryString}`);

      if (new_start !== start) {
        setDefaultDateRange({
          start: new_start,
          end: new_end,
        });
      }

      if (!ignore.value) {
        setStats(res.data.length === 0 ? 0 : formatStats(res.data[0]));
      }
    };
    // Execute the authenticated request and fetch statistics on component mount
    isLogged && executeAuthRequest(fetchStats);
    // Cleanup funtion to avoid state updates on an unmounted component
    return () => (ignore.value = true);
    // eslint-disable-next-line
  }, [location, isLogged, isOnline]);

  // Render StatsWrapper component with necessary props
  return (
    <StatsWrapper
      stats={stats}
      loading={loading}
      isLogged={isLogged}
      start={start}
      end={end}
    />
  );
};

export default StatsContainer;
