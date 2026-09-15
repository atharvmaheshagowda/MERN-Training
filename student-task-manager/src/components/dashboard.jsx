import StatCard from "./StatCard"; 
import TaskList from "./Tasklist";
import { useState } from "react"; 
import AddTask from "./AddTask"; 

function Dashboard(props) { 
  function toggleTask(id) { 
    props.setTasks((prevTasks) => 
      prevTasks.map((task) => { 
        if (task.id === id) { 
          let nextStatus = "To Do";
          if (task.status === "To Do" || task.status === "To do") nextStatus = "In Progress";
          else if (task.status === "In Progress") nextStatus = "Completed";
          else if (task.status === "Completed") nextStatus = "To Do";
          
          return { ...task, status: nextStatus }; 
        } 
        return task; 
      }) 
    ); 
  } 

  function addTask(newTask) { 
    // BUG FIX: Safely append to the previous state
    props.setTasks((prevTasks) => [...prevTasks, newTask]); 
  } 

  function deleteTask(id) { 
    // BUG FIX: Safely filter from the previous state
    props.setTasks((prevTasks) => prevTasks.filter(t => t.id !== id)); 
  } 

  // Guard against undefined props.tasks if the parent component fails to pass it initially
  const currentTasks = props.tasks || [];
  const totalTasks = currentTasks.length;
  const completedTasks = currentTasks.filter(t => t.status === "Completed").length;
  const pendingTasks = totalTasks - completedTasks;

  return ( 
    <main> 
      <div className="stat-container"> 
        <StatCard title={"Total Tasks"} value={totalTasks} /> 
        <StatCard title={"Completed Tasks"} value={completedTasks} /> 
        <StatCard title={"Pending Tasks"} value={pendingTasks} /> 
      </div> 
      
      <AddTask onAddTask={addTask}/> 
      
      <h2>Recent Tasks</h2> 
      <div className="task-container"> 
        {currentTasks.map((task) => ( 
          <TaskList 
            key={task.id} 
            id={task.id} 
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