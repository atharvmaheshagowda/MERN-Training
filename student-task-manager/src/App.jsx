import Navbar from './components/Nav-bar';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard';
import { Routes,Route } from 'react-router-dom';
import Tasks from './components/Tasks';
import TaskDetails from './components/TaskDetails';
import "./projection.css"
import { useState,useEffect } from 'react';
function App()
{
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", description: "Understanding Components & State Management", status: "In Progress" },
    { id: 2, title: "Learn MongoDB", description: "Create database schemas and connections", status: "To Do" },
    { id: 3, title: "Deploy App", description: "Host the full stack MERN application", status: "Completed" }
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTasks(data);
        }
      })
      .catch((err) => {
        console.warn("Backend server not connected on port 5000, continuing with local tasks:", err);
      });
  }, []);



  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
        <Route path="/tasks" element={<Tasks tasks={tasks} />} />
        <Route path="/tasks/:id"  element={<TaskDetails tasks={tasks} />} />
      </Routes>
    </div>
  );
}
export default App;
