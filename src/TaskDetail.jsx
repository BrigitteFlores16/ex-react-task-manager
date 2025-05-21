import { useParams } from "react-router-dom";
import { useTaskContext } from "./context/TaskContext";

function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useTaskContext();

  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return (
      <div className="alert alert-danger" role="alert">
        Task non trovato
      </div>
    );
  }

  const handleDelete = () => {
    console.log("Elimino task", id);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">{task.title}</h2>

          <div className="mb-3">
            <h5>Descrizione</h5>
            <p className="card-text">{task.description}</p>
          </div>

          <div className="mb-3">
            <h5>Stato</h5>
            <span
              className={`badge ${
                task.status === "Done"
                  ? "bg-success"
                  : task.status === "Doing"
                  ? "bg-warning"
                  : "bg-danger"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="mb-4">
            <h5>Data di creazione</h5>
            <p className="card-text">
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button className="btn btn-danger" onClick={handleDelete}>
            Elimina Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
