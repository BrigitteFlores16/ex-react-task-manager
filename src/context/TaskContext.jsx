import { createContext, useContext } from "react";
import { useTasks } from "../hooks/useTasks";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const tasksData = useTasks();

  return (
    <TaskContext.Provider value={tasksData}>{children}</TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
