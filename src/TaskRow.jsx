import { memo } from "react";

const TaskRow = memo(function TaskRow({ task }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "to do":
        return "bg-danger";
      case "doing":
        return "bg-warning";
      case "done":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <tr>
      <td>{task.title}</td>
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
