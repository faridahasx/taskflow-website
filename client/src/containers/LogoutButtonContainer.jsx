// MUI Components
import { LogoutTwoTone } from "@mui/icons-material";
// Custom hooks
import useClearCredentials from "../hooks/useClearCredentials";
// Assets
import { axiosWithCredentials } from "../assets/axiosInstance";
// Components
import IconButton from "../components/IconButtons/IconButton";

const LogoutButtonContainer = () => {
  const clearCredentials = useClearCredentials();
  const handleLogout = async () => {
    try {
      await axiosWithCredentials.post("/auth/logout");
    } catch (err) {}
    clearCredentials();
  };

  return (
    <IconButton
      Icon={<LogoutTwoTone />}
      buttonProps={{ onClick: handleLogout, title: "Sign out" }}
    />
  );
};

export default LogoutButtonContainer;
