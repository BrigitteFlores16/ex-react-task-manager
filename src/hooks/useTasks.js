import { useReducer, useEffect } from "react";
import { tasksReducer, initialState, ACTIONS } from "../reducers/tasksReducer";

const API_URL = import.meta.env.VITE_API_URL;

export function useTasks() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    fetchTasks();
  }, []);

  const checkTaskNameExists = (title, excludeId = null) => {
    return state.tasks.some(
      (task) =>
        task.title.toLowerCase() === title.toLowerCase() &&
        task.id !== excludeId
    );
  };

  const fetchTasks = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      dispatch({ type: ACTIONS.LOAD_TASKS, payload: data });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  const addTask = async (task) => {
    if (checkTaskNameExists(task.title)) {
      throw new Error("Esiste già un task con questo nome");
    }

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

      dispatch({ type: ACTIONS.ADD_TASK, payload: data.task });
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

      dispatch({ type: ACTIONS.REMOVE_TASK, payload: taskId });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateTask = async (taskId, updates) => {
    if (checkTaskNameExists(updates.title, taskId)) {
      throw new Error("Esiste già un task con questo nome");
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({ type: ACTIONS.UPDATE_TASK, payload: data.task });
      return data.task;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const removeMultipleTasks = async (taskIds) => {
    const results = await Promise.allSettled(
      taskIds.map((id) =>
        fetch(`${API_URL}/tasks/${id}`, {
          method: "DELETE",
        }).then((res) => res.json())
      )
    );

    const failedIds = results
      .map((result, index) => ({
        id: taskIds[index],
        success: result.status === "fulfilled" && result.value.success,
      }))
      .filter((item) => !item.success)
      .map((item) => item.id);

    if (failedIds.length > 0) {
      throw new Error(
        `Impossibile eliminare i task con ID: ${failedIds.join(", ")}`
      );
    }

    dispatch({ type: ACTIONS.REMOVE_MULTIPLE_TASKS, payload: taskIds });
  };

  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    addTask,
    removeTask,
    updateTask,
    removeMultipleTasks,
  };
}
