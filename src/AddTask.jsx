import { useState, useRef } from "react";
import { useTaskContext } from "./context/TaskContext";

function AddTask() {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const validateTitle = (value) => {
    if (!value.trim()) {
      setTitleError("Il campo nome non può essere vuoto");
      return false;
    }

    for (const symbol of symbols) {
      if (value.includes(symbol)) {
        setTitleError("Il nome non può contenere simboli speciali");
        return false;
      }
    }

    setTitleError("");
    return true;
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    validateTitle(newTitle);
  };

  const resetForm = () => {
    setTitle("");
    setTitleError("");
    descriptionRef.current.value = "";
    statusRef.current.value = "To do";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTitle(title)) {
      return;
    }

    const taskData = {
      title: title.trim(),
      description: descriptionRef.current.value.trim(),
      status: statusRef.current.value,
    };

    try {
      await addTask(taskData);
      alert("Task creato con successo!");
      resetForm();
    } catch (error) {
      alert(`Errore durante la creazione del task: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Nome del task
          </label>
          <input
            type="text"
            className={`form-control ${titleError ? "is-invalid" : ""}`}
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <div className="invalid-feedback">{titleError}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descrizione
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            ref={descriptionRef}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Stato
          </label>
          <select
            className="form-select"
            id="status"
            ref={statusRef}
            defaultValue="To do"
          >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
