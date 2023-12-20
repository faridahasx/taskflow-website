// External imports
import { useState } from "react";
import PropTypes from "prop-types";
// MUI components
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputLabel, InputAdornment, Input, IconButton } from "@mui/material";
// Styles
import "./FormField.css";

// PasswordField component for handling password input
const PasswordField = (props) => {
  // Destructure props
  const { password, handleInputChange } = props;
  // Local state for controlling password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Function to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <InputLabel className="auth-form-label" htmlFor="password">
        Password:
      </InputLabel>
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        value={password || ""}
        name="password"
        required
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePasswordVisibility}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

PasswordField.defaultProps = {
  password: "",
};

PasswordField.propTypes = {
  password: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default PasswordField;
