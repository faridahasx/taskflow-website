// External imports
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
// Utility functions
import { formatDateTime } from "../../../utils/dateUtils";
import { getTimeDifference } from "../../../utils/timerUtils";
// Components
import TaskDetail from "./TaskDetail";

const getTimerStatus = (startTime, finishTime, completedTime) => {
  const now = new Date();
  return completedTime
    ? "Duration:"
    : startTime > now
    ? "Start in:"
    : finishTime > now
    ? "Finish in:"
    : "Overdue by:";
};
const getTimerOperands = (startTime, finishTime) => {
  const now = new Date();
  return startTime > now ? [startTime, new Date()] : [finishTime, new Date()];
};

const MoreTaskDetails = (props) => {
  // Destructure props
  const { startTime, finishTime, createdAt, updatedAt, completedTime } = props;

  const [taskTimer, setTaskTimer] = useState(null);

  const [taskTimerStatus, setTaskTimerStatus] = useState(
    getTimerStatus(startTime, finishTime, completedTime)
  );
  // Memoize formatted date values for improved performance
  const createdAtFormatted = useMemo(
    () => formatDateTime(createdAt),
    [createdAt]
  );
  const updatedAtFormatted = useMemo(
    () => formatDateTime(updatedAt),
    [updatedAt]
  );
  const targetDuration = useMemo(
    () => getTimeDifference(finishTime, startTime),
    [startTime, finishTime]
  );

  useEffect(() => {
    let interval = null;
    if (completedTime)
      setTaskTimer(
        startTime < completedTime
          ? getTimeDifference(completedTime, startTime)
          : "Completed before start"
      );
    else {
      setTaskTimer(
        getTimeDifference(...getTimerOperands(startTime, finishTime))
      );
      interval = setInterval(() => {
        setTaskTimer(
          getTimeDifference(...getTimerOperands(startTime, finishTime))
        );
      }, 1000);
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [startTime, completedTime, finishTime]);

  useEffect(() => {
    setTaskTimerStatus(getTimerStatus(startTime, finishTime, completedTime));
    let timeout = null;
    if (!completedTime) {
      let now = new Date();
      let timeoutMilliseconds =
        startTime > now
          ? startTime - now
          : finishTime > now
          ? finishTime - now
          : 0;
      timeout = setTimeout(() => {
        let taskStatus = getTimerStatus(startTime, finishTime, completedTime);
        setTaskTimerStatus(taskStatus);
      }, timeoutMilliseconds + 1000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [startTime, completedTime, finishTime, taskTimerStatus]);

  return (
    <>
      <TaskDetail title="Created at:" value={createdAtFormatted} />
      <TaskDetail title="Last update:" value={updatedAtFormatted} />

      <TaskDetail title="Target duration:" value={targetDuration} />
      <TaskDetail
        title={taskTimerStatus}
        value={taskTimer ? taskTimer : "..."}
      />
    </>
  );
};

MoreTaskDetails.propTypes = {
  startTime: PropTypes.number.isRequired,
  finishTime: PropTypes.number.isRequired,
};

export default MoreTaskDetails;
