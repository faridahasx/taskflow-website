// External imports
import { useEffect } from "react";

// Custom React hook for handling keydown events
const useKeyDownListener = (callback, ignore = false) => {
  useEffect(() => {
    // Function to handle keydown events and invoke the provided callback
    const handleKeyDown = (event) => {
      callback(event);
    };
    // Add event listener only if ignore flag is false
    ignore === false && document.addEventListener("keydown", handleKeyDown);
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      // Remove event listener only if ignore flag is false
      ignore === false &&
        document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, ignore]);
};

export default useKeyDownListener;
