// External imports
import { useState } from "react";
import PropTypes from "prop-types";
// Components
import AuthFormContainer from "containers/AuthFormContainer";
import CloseButton from "components/IconButtons/CloseButton";
import Modal from "components/Modal/Modal";
// Styles
import "./AuthDialog.css";

const signIn = {
  heading: "Sign in to continue",
  path: "login",
  subtmitButtonText: "Sign in",
  changeMethod: "Sign up instead",
};

const signUp = {
  heading: "Sign up to start",
  path: "register",
  subtmitButtonText: "Sign up",
  changeMethod: "Sign in instead",
};

const AuthDialog = (props) => {
  // Destructure props
  const { handleCloseAuthDialog } = props;

  // Initialize component state
  const [authMethod, setAuthMethod] = useState(signIn);
  const { heading, changeMethod, path, subtmitButtonText } = authMethod;

  // Handle change tab
  const handleChangeTab = () => {
    setAuthMethod(path === signIn.path ? signUp : signIn);
  };

  return (
    <Modal handleClose={handleCloseAuthDialog}>
      <div>
        <div id="auth-container" className="column">
          <div id="auth-top" className="column">
            <CloseButton onClick={handleCloseAuthDialog} />
            <h1 id="auth-heading" className="center">
              {heading}
            </h1>
          </div>
          <div id="auth-wrapper" className="column">
            <AuthFormContainer
              key={path}
              path={path}
              subtmitButtonText={subtmitButtonText}
            />
            <button
              id="change-auth-method-btn"
              className="center"
              onClick={handleChangeTab}
            >
              {changeMethod}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AuthDialog.propTypes = {
  handleCloseAuthDialog: PropTypes.func.isRequired,
};

export default AuthDialog;
