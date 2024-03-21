import { useState, lazy } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import NavigationItem from "./NavigationItem";

const Sort = lazy(() => import("containers/SortContainer"));

const SortNav = () => {
  const [openComponent, setOpenComponent] = useState(false);
  const handlClick = () => setOpenComponent(!openComponent);

  return (
    <NavigationItem
      title={"Sort"}
      openComponent={openComponent}
      Component={<Sort handleClose={handlClick} />}
      Icon={<SwapVertIcon />}
      handleClick={handlClick}
    />
  );
};

export default SortNav;
