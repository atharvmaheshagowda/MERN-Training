import Navbar from './components/Nav-bar';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard';
import { Routes,Route } from 'react-router-dom';
import Tasks from './components/Tasks';
import TaskDetails from './components/TaskDetails';
import "./App.css"
import { useState } from 'react';
function App()
{
  const [tasks, setTasks] = useState([
    {id:1,title: "Learn React", description: "Understanding Components", status: "In Progress"},
    {id:2,title: "Learn MongoDB", description: "Create a simple React app", status: "To Do"}, 
    {id:3,title: "Deploy App", description: "Host the app on a platform", status: "Completed"}
  ]);
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
