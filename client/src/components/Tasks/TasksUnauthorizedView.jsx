// External imports
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Tasks from "./Tasks";
import { tasksSample } from "../../constants/sampleData";

const TasksUnauthorizedView = () => {
  const [searchParams] = useSearchParams();
  const [allTasks, setAllTasks] = useState(tasksSample);
  const [tasks, setTasks] = useState(tasksSample);

  useEffect(() => {
    let nextTasks;
    if (searchParams.get("all")) {
      nextTasks = allTasks;
    } else if (searchParams.get("completed")) {
      nextTasks = allTasks.filter((t) => t.completedAt);
    } else {
      const now = new Date();
      if (searchParams.get("current")) {
        nextTasks = allTasks.filter(
          (t) => !t.completedAt && t.finishDate > now && t.startDate < now
        );
      } else if (searchParams.get("overdue")) {
        nextTasks = allTasks.filter(
          (t) => !t.completedAt && t.finishDate < now
        );
      } else if (searchParams.get("upcoming")) {
        nextTasks = allTasks.filter((t) => !t.completedAt && t.startDate > now);
      } else {
        nextTasks = tasksSample;
      }
    }

    setTasks(nextTasks);
  }, [searchParams, allTasks]);

  // Toggle Completed Checkbox
  const handleToggleCompleted = (task) => {
    let value = null;
    if (!task.completedAt) value = new Date();

    setAllTasks((prev) => {
      return prev.map((t) => {
        if (t._id === task._id) return { ...t, completedAt: value };
        else return t;
      });
    });

    setTasks((prev) => {
      return prev.map((t) => {
        if (t._id === task._id) return { ...t, completedAt: value };
        else return t;
      });
    });
  };

  // Handle Delete Taskd
  const handleDelete = (task) => {
    setAllTasks((prev) => prev.filter((t) => t._id !== task._id));
    setTasks((prev) => prev.filter((t) => t._id !== task._id));
  };

  return (
    <Tasks
      tasks={tasks}
      handleToggleCompleted={handleToggleCompleted}
      handleDelete={handleDelete}
      isTransitioning={false}
      loadMore={false}
    />
  );
};

export default TasksUnauthorizedView;
