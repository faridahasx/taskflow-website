import { LinearProgress } from "@mui/material";
import "./PageLoading.css";

const PageLoading = () => {
  return (
    <div>
      <div className="page-loading-indicator">
        <LinearProgress />
      </div>
    </div>
  );
};

export default PageLoading;
