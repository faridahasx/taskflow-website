import PropTypes from "prop-types";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "./IconButton";

const TryAgain = (buttonProps) => {
  return (
    <IconButton
      aria-label="Try Again"
      data-testid="try-again"
      Icon={<ReplayIcon />}
      {...buttonProps}
    />
  );
};

TryAgain.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default TryAgain;
