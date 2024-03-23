// External imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// Utils
import { axiosWithCredentials } from "utils/axiosInstance";
import { MISSING_INPUT_FIELD, UNKNOWN_ERROR } from "constants/alertMessages";
// Custom hooks
import useKeyDownListener from "hooks/useKeyDownListener";
import useMakeServerRequest from "hooks/useMakeServerRequest";
// Components
import AuthForm from "components/Auth/AuthForm";

// ENV
const GOOGLE_CALLBACK_URL = process.env.REACT_APP_GOOGLE_CALLBACK_URL;

// Functional component
const AuthFormContainer = (props) => {
  // Destructuring props
  const { path, subtmitButtonText } = props;
  // Redux dispatch function
  const dispatch = useDispatch();
  // Local state
  const [user, setUser] = useState({});

  //
  const { executeServerRequest, loading } = useMakeServerRequest();

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle Google
  const handleContinueWithGoogle = () => {
    window.open(GOOGLE_CALLBACK_URL, "_self");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    executeServerRequest({
      callback: async () => {
        // Validating form fields
        if (
          !user.email ||
          !user.password ||
          (path === "register" && !(user.firstname && user.lastname))
        ) {
          dispatch({ type: "ALERT", payload: MISSING_INPUT_FIELD });
          return;
        }
        // Sending form data to the server
        const res = await axiosWithCredentials.post(`auth/${path}`, user);
        // Dispatching actions based on server response
        dispatch({ type: "IS_LOGGED", payload: true });
        dispatch({ type: "ALERT", payload: res.data });
        // Storing login status in local storage
        localStorage.setItem("firstLogin", "true");
      },
      fallbackErrorMessage: UNKNOWN_ERROR,
    });
  };

  //  Function to handle Enter key press for form submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };
  // Hook to listen for keydown events and invoke handleKeyDown function
  useKeyDownListener(handleKeyDown);

  // Render AuthForm component with necessary props
  return (
    <AuthForm
      path={path}
      subtmitButtonText={subtmitButtonText}
      loading={loading}
      user={user}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      handleContinueWithGoogle={handleContinueWithGoogle}
    />
  );
};

AuthFormContainer.propTypes = {
  path: PropTypes.string.isRequired,
  subtmitButtonText: PropTypes.string.isRequired,
};

export default AuthFormContainer;
