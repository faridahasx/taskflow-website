// MUI Components
import { LogoutTwoTone } from "@mui/icons-material";
// Custom hooks
import useClearCredentials from "../hooks/useClearCredentials";
// Assets
import { axiosWithCredentials } from "../assets/axiosInstance";
// Components
import IconButton from "../components/IconButtons/IconButton";
import { useState } from "react";
import CircularLoading from "../components/Loading/CircularLoading";

const LogoutButtonContainer = () => {
  const [loading, setLoading] = useState(false);

  const clearCredentials = useClearCredentials();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await axiosWithCredentials.post("/auth/logout");
      clearCredentials();
    } catch (err) {}
    setLoading(true);
  };

  return (
    <IconButton
      Icon={loading ? <CircularLoading /> : <LogoutTwoTone />}
      onClick={handleLogout}
      disabled={loading}
      title="Sign Out"
    />
  );
};

export default LogoutButtonContainer;
