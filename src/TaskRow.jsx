import { memo } from "react";
import { Link } from "react-router-dom";

const TaskRow = memo(function TaskRow({ task }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "To do":
        return "bg-danger";
      case "Doing":
        return "bg-warning";
      case "Done":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`} className="text-decoration-none">
          {task.title}
        </Link>
      </td>
      <td>
        <span className={`badge ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
