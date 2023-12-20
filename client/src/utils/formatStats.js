// This function formats statistics
export const formatStats = (data) => {
  const completedTasks = data["Completed"]; // Number of completed tasks
  const overdue = data["Overdue"];
  const completeRate = `${
    overdue === 0
      ? "100"
      : Math.round((completedTasks * 100) / (completedTasks + overdue))
  }%`;

  // Return the formatted statistics
  return {
    ...data,
    "Complete rate": completeRate,
  };
};
