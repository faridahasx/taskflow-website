// External imports
import { useEffect, useState } from "react";
// Custom hooks
import useScrollPosition from "./useScrollPosition";

// Custom React hook to track the scroll direction
const useScrollDirection = (offset = 0) => {
  // State to track the previous scroll position and current scroll direction
  const [prevScrollPosition, setPrevScrollPosition] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState("");
  // Custom hook to get the current scroll position
  const scrollY = useScrollPosition();

  useEffect(() => {
    // Function to handle scroll events and determine scroll direction
    const handleScroll = () => {
      // Determine scroll direction based on offset and scroll position changes
      setScrollDirection(
        scrollY > offset && scrollY > prevScrollPosition ? "scroll-down" : ""
      );
      // Update the previous scroll position
      setPrevScrollPosition(scrollY);
    };
    // Call handleScroll when the component mounts to set the initial state
    handleScroll();
    // eslint-disable-next-line
  }, [scrollY, offset]);
  // Return the current scroll direction

  return scrollDirection;
};

export default useScrollDirection;
