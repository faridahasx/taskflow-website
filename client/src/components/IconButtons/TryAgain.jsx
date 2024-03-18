import PropTypes from "prop-types";
import IconButton from "./IconButton";
import ReplayIcon from "@mui/icons-material/Replay";

const TryAgain = (buttonProps) => {
  return <IconButton Icon={<ReplayIcon />} {...buttonProps} />;
};

TryAgain.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default TryAgain;
