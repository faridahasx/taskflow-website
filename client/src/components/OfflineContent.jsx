import WifiOffIcon from "@mui/icons-material/WifiOff";

const OfflineContent = () => {
  return (
    <span className="center">
      <WifiOffIcon style={{ fontSize: "30px", marginRight: "3px" }} />
      <h2>You are offline</h2>
    </span>
  );
};

export default OfflineContent;
