import PropTypes from "prop-types";
import "./TaskDetail.css";

const TaskDetail = ({ title, value }) => {
  return (
    <span
      className="flex detail"
      title={`${title ? `${title}` : ""} ${value ? `${value}` : ""}`}
    >
      {title && <span className="flex">{title}</span>}
      {value && <span className="flex">{value}</span>}
    </span>
  );
};

TaskDetail.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TaskDetail;
