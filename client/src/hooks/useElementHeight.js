// External imports
import { useEffect, useState } from "react";

// Custom React hook for tracking the height of a specified DOM element
const useElementsHeight = (elementRef) => {
  // State to store and update the height
  const [height, setHeight] = useState(0);

  // Function to update the height based on the current element's offsetHeight
  const updateHeight = () => {
    const height_ = elementRef.current.offsetHeight;
    setHeight(height_);
  };

  // Effect hook to initialize and update the height on component mount and window resize
  useEffect(() => {
    // Initial height update
    updateHeight();

    // Event listener for window resize to update height dynamically
    window.addEventListener("resize", updateHeight);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [elementRef]); // Dependency on elementRef to re-run the effect when it changes

  // Return the current height
  return height;
};

export default useElementsHeight;
