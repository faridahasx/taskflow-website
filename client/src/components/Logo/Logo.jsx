import MovingIcon from "@mui/icons-material/Moving";
import "./Logo.css";

const Logo = () => {
  return (
    <div
      role="img"
      aria-label="TaskFlow Logo"
      className="logo center"
      title="TaskFlow"
    >
      <span className="logo-task">Task</span>
      <span className="logo-flow">Flow</span>
      <MovingIcon id="logo-icon" />
    </div>
  );
};

export default Logo;
