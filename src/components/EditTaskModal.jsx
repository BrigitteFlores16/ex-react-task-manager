import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To do");
  const editFormRef = useRef(null);

  useEffect(() => {
    if (task && show) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      status,
    };

    onSave(updatedTask);
  };

  const modalContent = (
    <form ref={editFormRef} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="edit-title" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          id="edit-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="edit-description" className="form-label">
          Descrizione
        </label>
        <textarea
          className="form-control"
          id="edit-description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="edit-status" className="form-label">
          Stato
        </label>
        <select
          className="form-select"
          id="edit-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </form>
  );

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Modifica Task"
      content={modalContent}
      confirmText="Salva"
      onConfirm={() => editFormRef.current?.requestSubmit()}
    />
  );
}

export default EditTaskModal;
