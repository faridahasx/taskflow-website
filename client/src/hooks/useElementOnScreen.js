// External imports
import { useEffect, useState } from "react";

// Custom React hook for determining if a specified element is currently visible on the screen
const useElementOnScreen = (options, containerRef) => {
  // State to track the visibility of the element
  const [isVisible, setIsVisible] = useState(false);

  // Callback function for the Intersection Observer
  const callbackFunction = (entries) => {
    // entries is an array of observed elements
    const [entry] = entries;
    // Update the visibility state based on whether the element is intersecting
    setIsVisible(entry.isIntersecting);
  };
  useEffect(() => {
    // Create an Intersection Observer with the specified options and callback
    const observer = new IntersectionObserver(callbackFunction, options);
    const current = containerRef.current;
    // If the containerRef is available, start observing the element
    if (current) observer.observe(current);
    // Cleanup function to stop observing when the component unmounts
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [containerRef, options]);
  // Return the containerRef and the visibility state
  return [containerRef, isVisible];
};

export default useElementOnScreen;
