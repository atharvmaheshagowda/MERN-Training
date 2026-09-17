import StatCard from "./StatCard";
import TaskList from "./Tasklist";
import { useState } from "react";
import AddTask from "./AddTask";

function Dashboard(props) {
  async function toggleTask(id) {
    const currentTasks = props.tasks || [];
    const targetTask = currentTasks.find(task => task._id === id);
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

  const currentTasks = props.tasks || [];
  const totalTasks = currentTasks.length;
  const completedTasks = currentTasks.filter(
    (t) => (t.status || "").toLowerCase() === "completed"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <main>
      <div className="stat-container">
        <StatCard title={"Total Tasks"} value={totalTasks} />
        <StatCard title={"Completed Tasks"} value={completedTasks} />
        <StatCard title={"Pending Tasks"} value={pendingTasks} />
      </div>
      <AddTask onAddTask={addTask} />
      <h2>Recent Tasks</h2>
      <div className="task-container">
        {currentTasks.map((task) => (
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
