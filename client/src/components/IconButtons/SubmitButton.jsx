// External imports
import PropTypes from "prop-types";
// MUI Component
import { Done } from "@mui/icons-material";
// Component
import CircularLoading from "../Loading/CircularLoading";
import IconButton from "./IconButton";

const SubmitButton = (props) => {
    // Destructure props
  const {loading, ...buttonProps} = props;


  return (
    <IconButton
      Icon={loading ? <CircularLoading /> : <Done />}
      {...buttonProps}
    />
  );
};

SubmitButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  buttonProps: PropTypes.object,
};

export default SubmitButton;
