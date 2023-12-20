// External imports
import { useEffect } from "react";

// Custom React hook to manage the 'overflow-hidden' class on the body element
function useBodyOverflowHidden() {
  useEffect(() => {
    // Check if the 'overflow-hidden' class is already present on the body
    const bodyOverflowAlreadyHidden =
      document.body.classList.contains("overflow-hidden");
    // If 'overflow-hidden' class is not already present, add it
    if (!bodyOverflowAlreadyHidden) {
      document.body.classList.add("overflow-hidden");
    }

    // Cleanup function: Remove 'overflow-hidden' class if it was added
    return () => {
      if (!bodyOverflowAlreadyHidden) {
        document.body.classList.remove("overflow-hidden");
      }
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  // No return value is needed for this particular hook
}

// Export the custom hook for use in other components
export default useBodyOverflowHidden;
