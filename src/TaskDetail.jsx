import { useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "./context/TaskContext";
import { useState } from "react";
import Modal from "./components/Modal";
import EditTaskModal from "./components/EditTaskModal";
import dayjs from "dayjs";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useTaskContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return (
      <div className="alert alert-danger" role="alert">
        Task non trovato
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminato con successo!");
      navigate("/");
    } catch (error) {
      alert(`Errore durante l'eliminazione del task: ${error.message}`);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(task.id, updatedTask);
      alert("Task modificato con successo!");
      setShowEditModal(false);
    } catch (error) {
      alert(`Errore durante la modifica del task: ${error.message}`);
    }
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
              {dayjs(task.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>

          <div className="btn-group">
            <button
              className="btn btn-primary me-2"
              onClick={() => setShowEditModal(true)}
            >
              Modifica Task
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Elimina Task
            </button>
          </div>

          <Modal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            title="Conferma eliminazione"
            content={`Sei sicuro di voler eliminare il task "${task.title}"?`}
            confirmText="Elimina"
          />

          <EditTaskModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            task={task}
            onSave={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
