// External imports
import PropTypes from "prop-types";

// Styles
import "./StatListItem.css";

const StatListItem = ({ statKey, statValue }) => {
  return (
    <li className="stat-li flex">
      <span className="stat-key flex">{statKey}:</span>
      <span className="stat-value flex">{statValue}</span>
    </li>
  );
};

StatListItem.propTypes = {
  statKey: PropTypes.string.isRequired,
  statValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
export default StatListItem;
