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
    let nextTasks = tasksSample;
    const URLTasksValue = searchParams.get("tasks");
    if (URLTasksValue) {
      const now = new Date();
      switch (URLTasksValue) {
        case "all":
          nextTasks = allTasks;
          break;
        case "completed":
          nextTasks = allTasks.filter((t) => t.completedAt);
          break;
        case "current":
          nextTasks = allTasks.filter(
            (t) => !t.completedAt && t.finishDate > now && t.startDate < now
          );
          break;
        case "overdue":
          nextTasks = allTasks.filter(
            (t) => !t.completedAt && t.finishDate < now
          );
          break
        case "upcoming":
          nextTasks = allTasks.filter(
            (t) => !t.completedAt && t.startDate > now
          );
          break
        default:
          nextTasks = tasksSample;
      }
    }

    setTasks(nextTasks);
  }, [searchParams]);

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
