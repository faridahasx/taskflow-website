// MUI components
import WifiOffIcon from "@mui/icons-material/WifiOff";
// Styles
import "./Offline.css";

const Offline = () => {
  return (
    <div id="offline" className="center">
      <span className="center">
        <WifiOffIcon
          style={{ fontSize: "20px" }}
        />
      </span>
      Not connected to the internet
    </div>
  );
};

export default Offline;
