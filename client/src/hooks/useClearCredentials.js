// External imports
import { useDispatch } from "react-redux";

// Custom React hook to clear credentials and update Redux state
const useClearCredentials = () => {
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Return a function to clear credentials and update Redux state
  return () => {
    // Remove 'firstLogin' from localStorage
    localStorage.removeItem("firstLogin");

    // Dispatch an action to update the 'IS_LOGGED' state to false
    dispatch({ type: "IS_LOGGED", payload: false });
    dispatch({ type: "AUTH_DIALOG", payload: true });
  };
};

// Export the custom hook for use in other components
export default useClearCredentials;
