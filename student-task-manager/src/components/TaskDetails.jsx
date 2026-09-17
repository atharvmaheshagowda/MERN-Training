import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function TaskDetails(props) {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/tasks/${id}`)
      .then((response) => {
        if (!response.ok) { 
          throw new Error("Task Not Found");
        }
        return response.json();
      })
      .then((data) => {
        setTask(data); 
      })
      .catch((error) => {
        console.log(error);
        setTask(null); 
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return (
      <div className="task-details-container">
        <h2>Loading Task Details...</h2>
      </div>
    );
  }

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
