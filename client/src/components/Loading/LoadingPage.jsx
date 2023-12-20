import { LinearProgress } from "@mui/material";
import "./LoadingPage.css";

const LoadingPage = () => {
  return (
    <div>
      <div className="loading-page-indicator">
        <LinearProgress />
      </div>
    </div>
  );
};

export default LoadingPage;
