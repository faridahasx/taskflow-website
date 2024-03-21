import { useState, lazy } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import NavigationItem from "./NavigationItem";

const Filters = lazy(() => import("containers/FiltersContainer"));

const FiltersNav = () => {
  const [openComponent, setOpenComponent] = useState(false);
  const handlClick = () => setOpenComponent(!openComponent);

  return (
    <NavigationItem
      title="Filters"
      openComponent={openComponent}
      Component={<Filters handleClose={handlClick} />}
      Icon={<FilterListIcon />}
      handleClick={handlClick}
    />
  );
};

export default FiltersNav;
