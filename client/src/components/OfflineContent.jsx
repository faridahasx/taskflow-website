import WifiOffIcon from "@mui/icons-material/WifiOff";
import ExceptionContainer from "./Error/ExceptionContainer";

const OfflineContent = () => {
  return (
    <ExceptionContainer Icon={WifiOffIcon} message="You are offline"/>
  );
};

export default OfflineContent;
