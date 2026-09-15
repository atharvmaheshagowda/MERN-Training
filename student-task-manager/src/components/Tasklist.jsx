import { Link } from "react-router-dom";

function TaskList(props) {
  const statusKey = (props.status || "todo").toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="task-card">
      <div className="task-info">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <p className={`status-pill status-${statusKey}`}>{props.status}</p>
      <button className="btn-toggle" onClick={props.onToggle}>Toggle Status</button>
      <button className="btn-delete" onClick={props.onDelete}>Delete</button>
      <Link to={`/tasks/${props.id}`} className="view-detail-link">VIEW DETAIL</Link>
    </div>
  );
}

export default TaskList;
