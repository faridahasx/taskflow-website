// External imports
import { useEffect, useRef } from "react";

// Custom React hook for handling click events outside a specified DOM element
const useClickOutside = (callback, ignore = false, ignoreClasses = []) => {
  // Validate that a callback function is provided
  if (typeof callback !== "function") {
    throw new Error("Callback must be a function");
  }
  // Create a ref to store a reference to the DOM element
  const ref = useRef(null);

  useEffect(() => {
    // Function to handle click events outside the specified element
    const handleClickOutside = (event) => {
      // Check if the clicked element has any of the specified ignore classes
      if (
        !ignoreClasses.some((className) =>
          event.target.classList.contains(className)
        ) &&
        // Check if the ref is defined and if the clicked element is outside the ref
        ref.current &&
        !ref.current.contains(event.target)
      )
        // Execute the provided callback function
        callback();
    };
    // Add event listeners for mouse clicks and touch events if ignore flag is false
    if (ignore === false) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      if (ignore === false) {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      }
    };
  }, [ref, callback, ignore, ignoreClasses]); // Dependencies for the useEffect hook
  // Return the ref, allowing it to be attached to the DOM element
  return ref;
};

export default useClickOutside;
