import {Link} from "react-router-dom"
function TaskList(props) {
    return (
        <div className="task-card">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p> {props.status}</p>
            <button onClick={props.onToggle}>Toggle Status</button>
            <button onClick={props.onDelete}>Delete</button>
            <Link to = {`/tasks/${props.id}`}>VIEW DETAIL</Link>
        </div>
    );
}

export default TaskList;