import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import activateFilters from "constants/activateFilters";
import FiltersShortCut from "components/Navigation/FiltersShortCut";

const FiltersShortCutContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get("tasks") || "all"
  );

  useEffect(() => {
    let currentFilter = searchParams.get("tasks");
    if (currentFilter) {
      setActiveFilter(
        activateFilters.findIndex((e) => e.value === currentFilter) !== -1
          ? currentFilter
          : "all"
      );
    }
  }, [searchParams]);

  const handleClick = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tasks", value);
    setSearchParams(newSearchParams);
  };

  return (
    <FiltersShortCut activeFilter={activeFilter} handleClick={handleClick} />
  );
};

export default FiltersShortCutContainer;
