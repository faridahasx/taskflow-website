// External imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// Custom hooks
import useNetworkStatus from "../hooks/useNetworkStatus";
import useKeyDownListener from "../hooks/useKeyDownListener";
// Assets
import { axiosWithCredentials } from "../assets/axiosInstance";
// Components
import AuthForm from "../components/Auth/AuthForm";

// ENV 
const GOOGLE_CALLBACK_URL = process.env.REACT_APP_GOOGLE_CALLBACK_URL;

// Functional component 
const AuthFormContainer = (props) => {
  // Destructuring props
  const { path, subtmitButtonText } = props;

  // Redux dispatch function
  const dispatch = useDispatch();
  // Check online status using custom hook
  const isOnline = useNetworkStatus();
  // Initialize state
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleContinueWithGoogle = () => {
    window.open(GOOGLE_CALLBACK_URL, "_self");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Checking network status before submmiting
    if (!isOnline) {
      dispatch({ type: "ALERT", payload: "Check your internet connection" });
      return;
    }
    // Validating form fields
    if (
      !user.email ||
      !user.password ||
      (path === "register" && !(user.firstname && user.lastname))
    ) {
      dispatch({ type: "ALERT", payload: "Please fill out all fields." });
      return;
    }

    // Initiating loading state
    setLoading(true);
    try {
      // Sending form data to the server
      const res = await axiosWithCredentials.post(`auth/${path}`, user);
      // Dispatching actions based on server response
      dispatch({ type: "IS_LOGGED", payload: true });
      dispatch({ type: "ALERT", payload: res.data });
      dispatch({ type: "AUTH_DIALOG", payload: false });
      // Storing first login status in local storage
      localStorage.setItem("firstLogin", "true");
    } catch (err) {
      // Handling errors and dispatching appropriate actions
      dispatch({
        type: "ALERT",
        payload:
          typeof err.response?.data === "string"
            ? err.response.data
            : "Something went wrong",
      });
    }
    // Resetting loading state after submission
    setLoading(false);
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
