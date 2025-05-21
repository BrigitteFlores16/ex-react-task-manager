import { memo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const TaskRow = memo(function TaskRow({ task, checked, onToggle }) {
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
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-3"
            checked={checked}
            onChange={() => onToggle(task.id)}
          />
          <Link to={`/task/${task.id}`} className="text-decoration-none">
            {task.title}
          </Link>
        </div>
      </td>
      <td>
        <span className={`badge ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </td>
      <td>{dayjs(task.createdAt).format("DD/MM/YYYY")}</td>
    </tr>
  );
});

export default TaskRow;
