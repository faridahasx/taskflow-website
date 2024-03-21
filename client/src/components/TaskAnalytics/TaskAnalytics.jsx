// External imports
import { useMemo } from "react";
import PropTypes from "prop-types";
// Hooks
import useNetworkStatus from "hooks/useNetworkStatus";
// Components
import OfflineContent from "components/OfflineContent";
import CircularLoading from "components/Loading/CircularLoading";
import FiltersNav from "components/NavigationItem/FiltersNav";
import TryAgain from "components/IconButtons/TryAgain";
import Metric from "./Metric";
import AnalyticsHeading from "./AnalyticsHeading";
// Styles
import "./TaskAnalytics.css";

const TaskAnalytics = ({
  start,
  end,
  taskAnalytics,
  errorDuringFetch,
  handleTryAgain,
}) => {
  const metricNames = useMemo(
    () => taskAnalytics && Object.keys(taskAnalytics),
    [taskAnalytics]
  );
  const isOnline = useNetworkStatus();

  return (
    <div
      role="region"
      aria-labelledby="analytics-heading"
      id="analytics"
      className="column"
    >
      {!isOnline && taskAnalytics === null ? (
        <OfflineContent />
      ) : (
        <div id="analytics-wrapper" className="column">
          <>
            <div id="analytics-top" className="flex">
              <FiltersNav />
              <AnalyticsHeading start={start} end={end} />
            </div>

            {taskAnalytics === null ? (
              <span className="center analytics-empty">
                {errorDuringFetch ? (
                  <TryAgain onClick={handleTryAgain} />
                ) : (
                  <CircularLoading />
                )}
              </span>
            ) : (
              taskAnalytics !== null &&
              (metricNames.length ? (
                <ul
                  aria-label="Task Analytics Summary"
                  id="analytics-summary"
                  className=""
                >
                  {metricNames.map((s) => (
                    <Metric
                      key={s}
                      metricKey={s}
                      metricValue={taskAnalytics[s]}
                    />
                  ))}
                </ul>
              ) : (
                <span className="center analytics-empty">
                  No available data
                </span>
              ))
            )}
          </>
        </div>
      )}
    </div>
  );
};

TaskAnalytics.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  taskAnalytics: PropTypes.any,
  errorDuringFetch: PropTypes.bool.isRequired,
  handleTryAgain: PropTypes.func.isRequired,
};

export default TaskAnalytics;
