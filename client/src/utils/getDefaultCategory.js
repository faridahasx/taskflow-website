const getDafultCategory = (categories) => {
  const searchParams = new URLSearchParams(window.location.search);

  const categoriesFromURL = searchParams.get("categories")?.split(",");
  if (categoriesFromURL) {
    for (const category of categoriesFromURL) {
      if (categories.findIndex((c) => c.title === category) >= 0)
        return category;
    }
  }

  return "All";
};

export default getDafultCategory;
