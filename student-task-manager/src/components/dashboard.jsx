import StatCard from "./StatCard";
import TaskList from "./Tasklist";
function Dashboard() {
  const tasks = [{id:1,title: "Learn React", description: "Understanding Components", status: "In Progress"},
     {id:2,title: "Learn MongoDB", description: "Create a simple React app", status: "pending"}, 
     {id:3,title: "Deploy App", description: "Host the app on a platform", status: "Completed"}];
  return (
    <main>
      <div className="stat-container">
        <StatCard title={"Total Tasks"} value={10} />
        <StatCard title={"Completed Tasks"} value={7} />
        <StatCard title={"Pending Tasks"} value={3} />
        <StatCard title={"Time Taken"} value={"2 hours"} />

      </div>
      <h2>Recent Tasks</h2>
      <div className="task-container">
                {tasks.map((task) => (
                  <TaskList key={task.id} title={task.title} description={task.description} status={task.status} />
                ))}
      </div>
    </main>
  );
}
export default Dashboard;