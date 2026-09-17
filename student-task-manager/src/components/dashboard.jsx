import StatCard from "./StatCard";
import TaskList from "./Tasklist";
import { useState } from "react";
import AddTask from "./AddTask";

function Dashboard(props) {
  // Fallback to an empty array if props.tasks is undefined
  const tasks = props.tasks || [];

  async function toggleTask(id) {
    const targetTask = tasks.find(task => task._id === id);
    if (!targetTask) return;

    const currentStatus = (targetTask.status || "To Do").toLowerCase();
    let nextStatus = "To Do";

    if (currentStatus === "to do") {
      nextStatus = "In Progress";
    } else if (currentStatus === "in progress") {
      nextStatus = "Completed";
    } else if (currentStatus === "completed") {
      nextStatus = "To Do";
    }

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      const updatedTask = await response.json();
      props.setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.warn("Backend server not synced:", error);
    }
  }

  function addTask(newTask) {
    props.setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      const deletedTask = await response.json();
      props.setTasks((prevTasks) =>
        prevTasks.filter((t) => t._id !== deletedTask._id)
      );
    } catch (error) {
      console.warn("Backend server not synced:", error);
    }
  }

  return (
    <main>
      <div className="stat-container">
        {/* Changed props.tasks to tasks to safely read length */}
        <StatCard title="Total Tasks" value={tasks.length}/>
        <StatCard title="Completed" value={tasks.filter((task) => task.status === "Completed").length}/>
        <StatCard title="Pending" value={tasks.filter((task) => task.status === "Pending").length}/>
      </div>
      <AddTask onAddTask={addTask} />
      <h2>Recent Tasks</h2>
      <div className="task-container">
        {/* Fixed: Changed currentTasks.map to tasks.map */}
        {tasks.map((task) => (
          <TaskList
            key={task._id}
            id={task._id}
            title={task.title}
            description={task.description}
            status={task.status}
            onToggle={() => toggleTask(task._id)}
            onDelete={() => deleteTask(task._id)}
          />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
