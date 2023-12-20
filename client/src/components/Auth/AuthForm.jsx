// External imports
import PropTypes from "prop-types";
// Components
import SubmitButton from "../TextButtons/SubmitButton";
import PasswordField from "./PasswordField";
import TextField from "./TextField";
import GoogleButton from "./GoogleButton";
// Styles
import "./AuthForm.css";

const AuthForm = (props) => {
  // Destructure props
  const {
    path,
    subtmitButtonText,
    loading,
    user,
    handleInputChange,
    handleSubmit,
    handleContinueWithGoogle,
  } = props;

  return (
    <>
      <form id="auth-form" className="column" onSubmit={handleSubmit}>
        {path === "register" && (
          <>
            <TextField
              name="firstname"
              label="First Name:"
              type="text"
              value={user.firstname}
              handleInputChange={handleInputChange}
            />
            <TextField
              name="lastname"
              label="Last Name:"
              type="text"
              value={user.lastname}
              handleInputChange={handleInputChange}
            />
          </>
        )}
        <TextField
          name="email"
          type="email"
          label="Email:"
          value={user.email}
          handleInputChange={handleInputChange}
        />

        <PasswordField
          password={user.password}
          handleInputChange={handleInputChange}
        />
        <SubmitButton
          buttonProps={{ disabled: loading, type: "submit", form: "auth-form" }}
          loading={loading}
          buttonText={subtmitButtonText}
        />
      </form>
      <span>Or</span>
      <GoogleButton handleContinueWithGoogle={handleContinueWithGoogle} />
    </>
  );
};

AuthForm.propTypes = {
  path: PropTypes.string.isRequired,
  subtmitButtonText: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleContinueWithGoogle: PropTypes.func.isRequired,
};

export default AuthForm;
