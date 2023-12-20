import MovingIcon from "@mui/icons-material/Moving";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo center" title="TaskFlow">
      <MovingIcon />
      <span className="logo-task">Task</span>
      <span className="logo-flow">Flow</span>
    </div>
  );
};

export default Logo;
