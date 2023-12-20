// Function to validate if a date string is a valid date
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date) && date.toString() !== "Invalid Date";
};

// Function to validate selected categories against a list of available categories
export const validateCategories = (selectedCategories, categories) => {
  if (!selectedCategories) return [];
  // Filter selectedCategories to only include only those present in the list of categories
  return selectedCategories.filter(
    (s) => categories.findIndex((c) => c.title === s) > -1
  );
};
