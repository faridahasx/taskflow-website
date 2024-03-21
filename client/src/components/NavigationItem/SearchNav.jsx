import { useState, lazy } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NavigationItem from "./NavigationItem";

const Search = lazy(() => import("containers/SearchContainer"));

const SearchNav = () => {
  const [openComponent, setOpenComponent] = useState(false);
  const handlClick = () => setOpenComponent(!openComponent);

  return (
    <NavigationItem
      title={"Search"}
      openComponent={openComponent}
      Component={<Search handleClose={handlClick} />}
      Icon={<SearchIcon />}
      handleClick={handlClick}
    />
  );
};

export default SearchNav;
