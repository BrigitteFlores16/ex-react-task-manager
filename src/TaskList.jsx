import { useState } from "react";
import { Link } from "react-router-dom";
import TaskRow from "./TaskRow";
import { useTaskContext } from "./context/TaskContext";

function TaskList() {
  const { tasks, isLoading, error } = useTaskContext();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      return task.status === filter;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );

  return (
    <div className="task-list">
      <div className="row mb-4 align-items-center">
        <div className="col">
          <h2 className="mb-0">Tasks</h2>
        </div>
        <div className="col-auto">
          <Link to="/add" className="btn btn-primary">
            Add New Task
          </Link>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8 mb-3 mb-md-0">
          <input
            type="text"
            placeholder="Search tasks..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">All Tasks</option>
            <option value="to do">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No tasks found
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TaskList;
