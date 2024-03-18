import { useEffect } from "react";
import { axiosWithCredentials } from "../assets/axiosInstance";
import useAuthRequest from "./useAuthRequest";

const useFetchTaskDescription = (
  taskID,
  description,
  dispatchTasks,
  setNewTask = null
) => {
  const { executeAuthRequest, loading, error, handleTryAgain } =
    useAuthRequest();

  useEffect(() => {
    // Check if description is undefined before fetching
    if (description === undefined && !error) {
      const fetch_description = async () => {
        const res = await axiosWithCredentials.get(`/task/${taskID}`);
        const data = res.data.description;
        // Set description in state and update tasks dispatch context
        setNewTask && setNewTask((prev) => ({ ...prev, description: data }));
        dispatchTasks({
          type: "edit",
          payload: { _id: taskID, description: data },
        });
      };
      // Execute the fetch
      executeAuthRequest({ callback: fetch_description });
    }
  }, [description, taskID, error]);

  return {
    fetchingDescription: loading,
    errorDuringFetch: error,
    handleTryFetchAgain: handleTryAgain,
  };
};

export default useFetchTaskDescription;
