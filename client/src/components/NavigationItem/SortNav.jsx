import { useState, lazy } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import NavigationItem from "./NavigationItem";

const Sort = lazy(() => import("../../containers/SortContainer"));

const SortNav = () => {
  const [openComponent, setOpenComponent] = useState(false);
  const handlClick = () => setOpenComponent(!openComponent);

  return (
    <NavigationItem
      handleClick={handlClick}
      title={"Sort"}
      Icon={<SwapVertIcon />}
      openComponent={openComponent}
      Component={<Sort handleClose={handlClick} />}
    />
  );
};

export default SortNav;
