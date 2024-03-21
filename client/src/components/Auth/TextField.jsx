// External imports
import PropTypes from "prop-types";
// MUI Components
import { InputLabel, Input } from "@mui/material";
// Styles
import "./FormField.css";

const TextField = (props) => {
  // Destructure props
  const { name, label, type, value, handleInputChange } = props;

  return (
    <>
      <InputLabel className="auth-form-label" htmlFor={name}>
        {label}
      </InputLabel>
      <Input
        id={name}
        name={name}
        type={type}
        value={value || ""}
        onChange={handleInputChange}
        required
      />
    </>
  );
};

TextField.defaultProps = {
  value: "",
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default TextField;
