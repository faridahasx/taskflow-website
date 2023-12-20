// Date format options for Intl.DateTimeFormat
const dateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const dateFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

// Function to format a given date using specified format options
export const formatDateTime = (date) =>
  new Intl.DateTimeFormat("en-US", dateTimeFormatOptions).format(
    new Date(date)
  );

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", dateFormatOptions).format(new Date(date));

// Function to calculate the date after a given number of days
export const getDateWithNDaysOfDifference = (n) => {
  const today = new Date();
  return new Date(
    new Date(today.setDate(today.getDate() + n)).setHours(0)
  ).setMinutes(0);
};
