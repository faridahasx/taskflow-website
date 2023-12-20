// Function to format time duration in days,  hours, and minutes
export const formatTimeDifference = (timeDifference) => {
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const formattedDays = `${days} ${days === 1 ? "day" : "days"}, `;
  const formattedHours = `${hours} ${hours === 1 ? "hour" : "hours"}, `;
  const formattedMinutes = `${minutes} ${
    minutes === 1 ? "minute" : "minutes"
  }, `;

  const formattedSeconds = `${seconds} ${seconds === 1 ? "second" : "seconds"}`;

  return `${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`;
};

// Function to get formatted time duration between two dates
export const getTimeDifference = (date1, date2) => {
  const timeDifference = date1 > date2 ? date1 - date2 : date2 - date1;
  return formatTimeDifference(timeDifference);
};

// Function to get formatted time remaining from the current date to a given timestamp
export const getTimeRemaining = (timestamp) => {
  return getTimeDifference(timestamp, new Date().getTime());
};
