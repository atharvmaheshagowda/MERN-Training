import Navbar from './components/Nav-bar';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard';
import { Routes,Route } from 'react-router-dom';
import Tasks from './components/Tasks';
import "./App.css"
function App()
{
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}
export default App;
