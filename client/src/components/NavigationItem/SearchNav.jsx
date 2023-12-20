import { useState, lazy } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NavigationItem from "./NavigationItem";

const Search = lazy(() => import("../../containers/SearchContainer"));

const SearchNav = () => {
  const [openComponent, setOpenComponent] = useState(false);
  const handlClick = () => setOpenComponent(!openComponent);

  return (
    <NavigationItem
      handleClick={handlClick}
      title={"Search"}
      Icon={<SearchIcon />}
      openComponent={openComponent}
      Component={<Search handleClose={handlClick} />}
    />
  );
};

export default SearchNav;
