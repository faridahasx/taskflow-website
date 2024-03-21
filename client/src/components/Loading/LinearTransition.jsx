import { LinearProgress } from "@mui/material";
import "./LinearTransition.css";

const LinearTransition = (props) => {
  return (
    <div data-testid="linear-transiton" className="linear-transiton" {...props}>
      <LinearProgress />
    </div>
  );
};

export default LinearTransition;
