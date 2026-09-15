import { useParams, Link } from "react-router-dom";

function TaskDetails(props) {
  const { id } = useParams();
  const currentTasks = props.tasks || [];
  const task = currentTasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className="task-details-container">
        <div className="task-details-card not-found-card">
          <div className="empty-icon">🔍</div>
          <h2>Task Not Found</h2>
          <p>We couldn't find a task with ID #{id}. It may have been deleted or doesn't exist.</p>
          <div className="not-found-actions">
            <Link to="/tasks" className="btn-primary">View All Tasks</Link>
            <Link to="/" className="back-link">Return to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const statusKey = (task.status || "todo").toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="task-details-container">
      <div className="task-details-nav">
        <Link to="/tasks" className="back-link">
          ← Back to All Tasks
        </Link>
        <Link to="/" className="back-link">
          Dashboard →
        </Link>
      </div>

      <div className="task-details-card">
        <div className="task-details-header">
          <span className="task-id-badge">TASK #{id}</span>
          <span className={`status-pill status-${statusKey}`}>{task.status}</span>
        </div>

        <h1 className="task-details-title">{task.title}</h1>

        <div className="task-details-section">
          <h4 className="section-label">DESCRIPTION</h4>
          <p className="task-details-desc">
            {task.description || "No description provided for this task."}
          </p>
        </div>

        <div className="task-details-meta">
          <div className="meta-card">
            <span className="meta-label">Status</span>
            <span className="meta-value">{task.status}</span>
          </div>
          <div className="meta-card">
            <span className="meta-label">Task ID</span>
            <span className="meta-value">#{id}</span>
          </div>
          <div className="meta-card">
            <span className="meta-label">Priority / Scope</span>
            <span className="meta-value">Academic</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;