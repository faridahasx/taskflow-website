import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

const CircularLoading = ({ scale, color }) => {
  return (
    <CircularProgress
      data-testid="loading"
      style={{ color: color, scale: scale }}
    />
  );
};

CircularLoading.propTypes = {
  scale: PropTypes.string,
  color: PropTypes.string,
};

CircularLoading.defaultProps = {
  scale: "0.5",
  color: "var(--main-blue)",
};

export default CircularLoading;
