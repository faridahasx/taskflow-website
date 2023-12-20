// External imports
import { useState } from "react";
import PropTypes from "prop-types";
// Components
import AuthFormContainer from "../../containers/AuthFormContainer";
import CloseButton from "../IconButtons/CloseButton";
import Modal from "../Modal/Modal";
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

const AuthDialog = ({ handleCloseAuthDialog }) => {
  const [authMethod, setAuthMethod] = useState(signIn);
  const { heading, changeMethod, path, subtmitButtonText } = authMethod;

  const handleChangeAuthMethod = () => {
    setAuthMethod(path === signIn.path ? signUp : signIn);
  };

  return (
    <Modal handleClose={handleCloseAuthDialog}>
      <div>
        <div id="auth-container" className="column">
          <div className="column" id="auth-top">
            <CloseButton onClick={handleCloseAuthDialog} />
            <h1 className="center">{heading}</h1>
          </div>
          <div id="auth-wrapper" className="column">
            <AuthFormContainer
              key={path}
              path={path}
              subtmitButtonText={subtmitButtonText}
            />
            <button
              onClick={handleChangeAuthMethod}
              id="change-auth-method-btn"
              className="center"
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
