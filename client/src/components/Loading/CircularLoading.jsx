import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

const CircularLoading = ({ scale, color, ...props }) => {
  return (
    <CircularProgress
      data-testid={!props["data-testid"] && "loading"}
      style={{ color: color, scale: scale }}
      {...props}
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
