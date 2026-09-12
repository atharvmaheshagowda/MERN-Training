import {Link} from "react-router-dom"
function Navbar()
{
  return (
    <nav>
      <h2>Student Task Manager</h2>
      <div className="nav-links">
      <Link to = {"/"}>HOME</Link>
      <Link to = {"/tasks"}>TASKS</Link>
      </div>
    </nav>
  ) 
}
export default Navbar;