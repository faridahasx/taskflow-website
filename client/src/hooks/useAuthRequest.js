// External imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Custom hooks
import useClearCredentials from "./useClearCredentials";
import useNetworkStatus from "./useNetworkStatus";

// Custom React hook for handling requests that requires authenticed user
const useAuthRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOnline = useNetworkStatus();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const clearCredentials = useClearCredentials();
  const handleTryAgain = () => setError(null);

  // Function to execute handling requests that requires authenticed user
  const executeAuthRequest = async ({
    callback,
    callbackArgs = [],
    successMessage,
    errorMessage='Something went wrong',
  }) => {
    // Check if the user is online before making the request
    if (!isOnline) {
      // Dispatch an alert if there's no internet connection
      dispatch({ type: "ALERT", payload: "Check your internet connection" });
      // Display AuthDialog if the user is not authenticated
    } else if (isLogged) {
      try {
        // Reset error state if specified
        error && setError(null);
        // Set loading state if specified
        setLoading(true);
        // Execute the callback with provided arguments
        await callback(...callbackArgs);
        // Dispatch success alert if successMessage is provided
        dispatch({ type: "ALERT", payload: successMessage });
        // Reset loading state if it was set
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
              payload: "Please login",
            });
          } else if (typeof err.response.data === "string") {
            // Dispatch the error message if it's a string
            dispatch({ type: "ALERT", payload: err.response.data });
          }
        } else {
          // Dispatch a generic error for other types of errors
          errorMessage &&
            dispatch({ type: "ALERT", payload: errorMessage });
        }
      }
       // Reset loading state if specified
      setLoading(false);
    }
  };
  // Return the authentication request function and loading state
  return { executeAuthRequest, loading, isOnline, error, handleTryAgain };
};

export default useAuthRequest;
