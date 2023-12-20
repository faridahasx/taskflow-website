import { useLayoutEffect, useState } from "react";

// Custom React hook for tracking the vertical scroll position
const useScrollPosition = () => {
  // State to store the current vertical scroll position
  const [scrollY, setScrollY] = useState(window.scrollY);
  // useLayoutEffect to handle scroll events and update scroll position
  useLayoutEffect(() => {
    // Event handler for the 'scroll' event
    const handleScroll = () => {
      // Update scrollY state with the current vertical scroll position
      setScrollY(window.scrollY);
    };
    // Add scroll event listener when the component mounts or updates
    window.addEventListener("scroll", handleScroll);
    // Initial call to set the scroll position when the component is mounted
    handleScroll();
    // Cleanup: remove the scroll event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array ensures the effect runs only once on mount
  // Return the current vertical scroll position

  return scrollY;
};

export default useScrollPosition;
