import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTitle(title)) {
      return;
    }

    const task = {
      title: title.trim(),
      description: descriptionRef.current.value.trim(),
      status: statusRef.current.value,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
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
            defaultValue="to do"
          >
            <option value="to do">To do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
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
