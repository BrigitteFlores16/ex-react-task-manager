import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import TaskDetail from "./TaskDetail";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="min-vh-100 bg-light">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container">
              <span className="navbar-brand">Task Manager</span>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""}`
                      }
                      end
                    >
                      Task List
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/add"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""}`
                      }
                    >
                      Add Task
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/task/:id" element={<TaskDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
