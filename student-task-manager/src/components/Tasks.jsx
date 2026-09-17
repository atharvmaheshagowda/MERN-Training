import { Link } from "react-router-dom";

function Tasks(props) {
  const taskList = props.tasks || [];

  return (
    <div className="tasks-page-container">
      <div className="tasks-page-header">
        <div>
          <h1>All Tasks</h1>
          <p className="tasks-subtitle">Overview of all assigned student coursework and milestones</p>
        </div>
        <div className="tasks-count-pill">
          <span>{taskList.length} Tasks</span>
        </div>
      </div>

      {taskList.length === 0 ? (
        <div className="empty-tasks-state">
          <div className="empty-icon">📋</div>
          <h3>No tasks found</h3>
          <p>You have no active tasks at the moment. Add tasks from the dashboard!</p>
          <Link to="/" className="btn-primary">Go to Dashboard</Link>
        </div>
      ) : (
        <div className="tasks-grid">
          {taskList.map((task) => {
            const statusKey = (task.status || "todo").toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={task.id} className="task-grid-card">
                <div className="task-grid-header">
                  <span className={`status-pill status-${statusKey}`}>{task.status}</span>
                  <span className="task-id-tag">#{task._id}</span>
                </div>
                <h3>{task.title}</h3>
                <p className="task-grid-desc">{task.description}</p>
                <div className="task-grid-footer">
                  <Link to={`/tasks/${task._id}`} className="view-detail-link">
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Tasks;
