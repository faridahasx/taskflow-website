// External imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Custom hooks
import useClearCredentials from "./useClearCredentials";
import useNetworkStatus from "./useNetworkStatus";

// Custom React hook for handling requests that requires authenticed user
const useAuthRequest = () => {
  const [loading, setLoading] = useState(false);
  const isOnline = useNetworkStatus();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const clearCredentials = useClearCredentials();

  // Function to execute handling requests that requires authenticed user
  const executeAuthRequest = async (
    callback,
    successMessage,
    args = [],
    setLoadingState = true
  ) => {
    // Check if the user is online before making the request
    if (!isOnline) {
      // Dispatch an alert if there's no internet connection
      dispatch({ type: "ALERT", payload: "Check your internet connection" });
      // Display AuthDialog if the user is not authenticated
    } else if (isLogged === false) {
      dispatch({ type: "AUTH_DIALOG", payload: true });
    } else {
      try {
        // Set loading state if specified
        setLoadingState && setLoading(true);
        // Execute the callback with provided arguments
        await callback(...args);
        // Dispatch success alert if successMessage is provided
        successMessage && dispatch({ type: "ALERT", payload: successMessage });
        // Reset loading state if it was set
        setLoadingState && setLoading(false);
      } catch (err) {
        // Reset loading state in case of an error
        setLoadingState && setLoading(false);
        // Handle different types of error
        if (err.response) {
          if (err.response.status === 401) {
            // Clear credentials and dispatch an alert if unauthorized
            clearCredentials();
            dispatch({
              type: "ALERT",
              payload: "Please login",
            });
          } else if (typeof err.response.data === "string") {
            // Dispatch the error message if it's a string
            dispatch({ type: "ALERT", payload: err.response.data });
          }
        } else {
          // Dispatch a generic error for other types of errors
          // dispatch({ type: "ALERT", payload: "Something went wrong" });
        }
      }
    }
  };
  // Return the authentication request function and loading state
  return [executeAuthRequest, loading, isOnline];
};

export default useAuthRequest;
