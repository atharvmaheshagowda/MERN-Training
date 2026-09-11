import StatCard from "./StatCard";
import TaskList from "./Tasklist";
import { useState } from "react";
import AddTask from "./AddTask";
function Dashboard() {
  const [tasks, setTasks] = useState([
    {id:1,title: "Learn React", description: "Understanding Components", status: "In Progress"},
    {id:2,title: "Learn MongoDB", description: "Create a simple React app", status: "To do"}, 
    {id:3,title: "Deploy App", description: "Host the app on a platform", status: "Completed"}
  ]);
  function toggleTask(id)
  {
    setTasks(
      tasks.map((task) => {
        if(task.id === id){
          return{...task,status:task.status === "completed"?"To Do":(task.status === "To Do"?"In Progress":(task.status === "In Progress"?"Completed":"To Do"))}
        }
        return task;
      })
    );
  
  }
  function addTask(newTask)
  {
    setTasks([...tasks,newTask]);
  }
  function deleteTask(id)
  {
    setTasks(tasks.filter(t => t.id !== id));
        return task;
  }
  return (
    <main>
      <div className="stat-container">
        <StatCard title={"Total Tasks"} value={tasks.length} />
        <StatCard title={"Completed Tasks"} value={7} />
        <StatCard title={"Pending Tasks"} value={tasks.length} />
        <StatCard title={"Time Taken"} value={"2 hours"} />

      </div>
      <AddTask onAddTask={addTask}/>
      <h2>Recent Tasks</h2>
      <div className="task-container">
        {tasks.map((task) => (
          <TaskList
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </main>
  );
}
export default Dashboard;