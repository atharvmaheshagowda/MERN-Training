function TaskList(props) {
    return (
        <div className="task-card">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p> {props.status}</p>
            <button onClick={props.onToggle}>Toggle Status</button>
        </div>
    );
}

export default TaskList;