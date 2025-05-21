import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
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
      const response = await fetch(`${API_URL}/tasks`, {
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

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (err) {
      throw new Error(err.message);
    }
  };

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
