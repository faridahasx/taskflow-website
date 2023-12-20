// Extenal imports
import { useEffect, useState } from "react";

// Custom React hook for monitoring the network status
const useNetworkStatus = () => {
  // State to track the online/offline status
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    // Function to handle changes in network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    // Add event listeners for online and offline events
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, []);
  // Return the current online/offline status

  return isOnline;
};

export default useNetworkStatus;
