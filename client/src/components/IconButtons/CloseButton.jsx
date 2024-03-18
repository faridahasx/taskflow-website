// External imports
// MUI Components
import { Close } from "@mui/icons-material";
// Components
import IconButton from "./IconButton";

const CloseButton = (buttonProps) => {
  return (
    <IconButton
      Icon={<Close />}
      title='Close'
      {...buttonProps}
    />
  );
};

export default CloseButton;
