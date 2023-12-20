// External imports
import PropTypes from "prop-types";
// MUI Components
import { Edit } from "@mui/icons-material";
// Components
import IconButton from "./IconButton";

const EditButton = (buttonProps) => {
  return (
    <IconButton
      Icon={<Edit />}
      buttonProps={{ ...buttonProps, title: "Edit" }}
    />
  );
};

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
