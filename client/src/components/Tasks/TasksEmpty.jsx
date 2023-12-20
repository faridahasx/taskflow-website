import PropTypes from "prop-types";

const TasksEmpty = ({ children }) => {
  return <span className="center tasks-empty">{children}</span>;
};

TasksEmpty.propTypes = {
  children: PropTypes.any,
};
export default TasksEmpty;
