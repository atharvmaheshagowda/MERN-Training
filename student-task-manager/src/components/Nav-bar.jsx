import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Student Task Manager</h2>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          HOME
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? "active" : ""}>
          TASKS
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;