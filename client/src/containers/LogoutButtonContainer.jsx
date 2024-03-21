// MUI Components
import { LogoutTwoTone } from "@mui/icons-material";
// Custom hooks
import useClearCredentials from "hooks/useClearCredentials";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
// Components
import IconButton from "components/IconButtons/IconButton";
import CircularLoading from "components/Loading/CircularLoading";
import useMakeServerRequest from "hooks/useMakeServerRequest";

const LogoutButtonContainer = () => {
  const { executeServerRequest, loading } = useMakeServerRequest();

  const clearCredentials = useClearCredentials();
  const handleLogout = async () => {
    executeServerRequest({
      callback: async () => {
        await axiosWithCredentials.post("/auth/logout");
        clearCredentials();
      },
    });
  };

  return (
    <IconButton
      title="Sign Out"
      onClick={handleLogout}
      Icon={loading ? <CircularLoading /> : <LogoutTwoTone />}
      disabled={loading}
    />
  );
};

export default LogoutButtonContainer;
