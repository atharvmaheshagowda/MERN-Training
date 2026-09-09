import Navbar from './components/Nav-bar';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard';
import "./App.css"
function App()
{
  return (
    <div>
      <Navbar />
      <Welcome />  
      <Dashboard />
    </div>
  );
}
export default App;
