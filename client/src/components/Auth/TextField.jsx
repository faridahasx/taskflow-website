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
        type={type}
        value={value || ""}
        name={name}
        required
        onChange={handleInputChange}
      />
    </>
  );
};

TextField.defaultProps = {
  value: "",
};

TextField.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextField;
