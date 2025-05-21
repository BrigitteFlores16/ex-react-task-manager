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

  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setTasks((currentTasks) => [...currentTasks, data.task]);
      return data.task;
    } catch (err) {
      throw new Error(err.message);
    }
  };

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
