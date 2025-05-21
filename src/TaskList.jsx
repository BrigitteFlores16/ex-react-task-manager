import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import TaskRow from "./TaskRow";
import { useTaskContext } from "./context/TaskContext";
import { useDebounce } from "./hooks/useDebounce";
import "./index.css";

function TaskList() {
  const { tasks, isLoading, error } = useTaskContext();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((order) => order * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column)
      return <span className="material-symbols-outlined">swap_vert</span>;
    return sortOrder === 1 ? (
      <span className="material-symbols-outlined">arrow_upward</span>
    ) : (
      <span className="material-symbols-outlined">arrow_downward</span>
    );
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks
      .filter((task) => {
        if (filter === "all") return true;
        return task.status === filter;
      })
      .filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "status": {
          const statusOrder = { "To do": 1, Doing: 2, Done: 3 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        }
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      return comparison * sortOrder;
    });
  }, [tasks, filter, searchQuery, sortBy, sortOrder]);

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
            onChange={(e) => debouncedSearch(e.target.value)}
            defaultValue={searchQuery}
          />
        </div>
        <div className="col-md-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">All Tasks</option>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {filteredAndSortedTasks.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No tasks found
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th
                  className="cursor-pointer user-select-none"
                  onClick={() => handleSort("title")}
                  style={{ cursor: "pointer" }}
                >
                  Nome {getSortIcon("title")}
                </th>
                <th
                  className="cursor-pointer user-select-none"
                  onClick={() => handleSort("status")}
                  style={{ cursor: "pointer" }}
                >
                  Stato {getSortIcon("status")}
                </th>
                <th
                  className="cursor-pointer user-select-none"
                  onClick={() => handleSort("createdAt")}
                  style={{ cursor: "pointer" }}
                >
                  Data di creazione {getSortIcon("createdAt")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTasks.map((task) => (
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
