// External imports
import PropTypes from "prop-types";
// Styles
import "./Metric.css";

const Metric = ({ metricKey, metricValue }) => {
  return (
    <li className="metric-li flex">
      <span className="metric-key flex">{metricKey}:</span>
      <span className="metric-value flex">{metricValue}</span>
    </li>
  );
};

Metric.propTypes = {
  metricKey: PropTypes.string.isRequired,
  metricValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
export default Metric;
