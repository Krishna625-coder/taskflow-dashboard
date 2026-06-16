import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed")
      return matchesSearch && t.completed;

    if (filter === "pending")
      return matchesSearch && !t.completed;

    return matchesSearch;
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">

        <div className="header">
          <h1>TaskFlow Dashboard</h1>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="stats">
          <div className="card">
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="card">
            <h2>{tasks.filter((t) => t.completed).length}</h2>
            <p>Completed</p>
          </div>

          <div className="card">
            <h2>{tasks.filter((t) => !t.completed).length}</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter Task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <div className="controls">
          <input
            type="text"
            placeholder="Search Task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="task-list">
          {filteredTasks.map((t) => (
            <div className="task-card" key={t.id}>

              <span
                className={t.completed ? "completed" : ""}
                onClick={() => toggleTask(t.id)}
              >
                {t.text}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTask(t.id)}
              >
                Delete
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;