import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";   // <-- IMPORTANT
import api from "./api";
import "./task.css";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const navigate = useNavigate(); // <-- REQUIRED

  const load = async () => {
    const res = await api.get("tasks/");
    setTasks(res.data);
  };

  const create = async () => {
    await api.post("tasks/", { title });
    setTitle("");
    load();
  };

  const toggle = async (task) => {
    await api.put(`tasks/${task.id}/`, { ...task, completed: !task.completed });
    load();
  };

  const remove = async (id) => {
    await api.delete(`tasks/${id}/`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="task-container">

      {/* ---- Profile Button ---- */}
      <div className="top-bar">
        <button
          className="profile-btn"
          onClick={() => navigate("/dashboard")}   // <-- SEND TO DASHBOARD
        >
          Profile
        </button>
      </div>

      <div className="task-input-box">
        <input
          className="task-input"
          placeholder="Enter new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="task-add-btn" onClick={create}>
          Add Task
        </button>
      </div>

      <div className="task-list">
        {tasks.map((t) => (
          <div key={t.id} className="task-item">
            <span
              className={`task-title ${t.completed ? "done" : ""}`}
              onClick={() => toggle(t)}
            >
              {t.completed ? "✔" : "○"} {t.title}
            </span>

            <button className="task-delete-btn" onClick={() => remove(t.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
