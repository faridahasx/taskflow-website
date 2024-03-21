// MUI components
import WifiOffIcon from "@mui/icons-material/WifiOff";
// Styles
import "./Offline.css";

const Offline = () => {
  return (
    <div role="status" aria-live="assertive" id="offline" className="center">
      <span aria-hidden="true" className="center">
        <WifiOffIcon style={{ fontSize: "20px" }} />
      </span>
      Not connected to the internet
    </div>
  );
};

export default Offline;
