// External imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NO_INTERNET, UNAUTHORIZED } from "constants/alertMessages";
// Custom hooks
import useClearCredentials from "./useClearCredentials";
import useNetworkStatus from "./useNetworkStatus";

// Custom React hook for handling requests that requires authenticed user
const useMakeServerRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOnline = useNetworkStatus();
  const dispatch = useDispatch();
  const clearCredentials = useClearCredentials();
  const handleTryAgain = () => setError(null);

  // Function to execute handling server requests
  const executeServerRequest = async ({
    callback,
    callbackArgs = [],
    successMessage = null,
    fallbackErrorMessage = null,
  }) => {
    // Check if the user is online before making the request
    if (!isOnline) {
      // Dispatch an alert if there's no internet connection
      dispatch({ type: "ALERT", payload: NO_INTERNET });
      // Display AuthDialog if the user is not authenticated
    } else {
      try {
        // Reset error state if specified
        error && setError(null);
        // Set loading state if specified
        setLoading(true);
        // Execute the callback with provided arguments
        await callback(...callbackArgs);
        // Dispatch success alert if successMessage is provided
        successMessage && dispatch({ type: "ALERT", payload: successMessage });
      } catch (err) {
        // Set error state if specified
        setError(err);
        // Handle different types of errors
        if (err.response) {
          // if unauthorized
          if (err.response.status === 401) {
            // Clear credentials and dispatch an alert
            clearCredentials();
            dispatch({
              type: "ALERT",
              payload: UNAUTHORIZED,
            });
          } else if (typeof err.response.data === "string") {
            // Dispatch the error message if it's a string
            dispatch({ type: "ALERT", payload: err.response.data });
          }
        } else {
          // Dispatch a generic error for other types of errors
          fallbackErrorMessage &&
            dispatch({ type: "ALERT", payload: fallbackErrorMessage });
        }
      }
      // Reset loading state if specified
      setLoading(false);
    }
  };
  // Return the authentication request function and loading state
  return { executeServerRequest, loading, isOnline, error, handleTryAgain };
};

export default useMakeServerRequest;
