import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const addTask = async (task) => {};

  const removeTask = async (taskId) => {};

  const updateTask = async (taskId, updates) => {};

  return {
    tasks,
    isLoading,
    error,
    addTask,
    removeTask,
    updateTask,
  };
}
