// bring express in Node.js
const express = require("express")
const cors=require("cors");

// create express app using What we imported
const app = express();

//use cors middleware to handle requests
app.use(cors());
app.use(express.json());

  const tasks = [
    {id:1,title: "Learn React", description: "Understanding Components", status: "In Progress"},
    {id:2,title: "Learn MongoDB", description: "Create a simple React app", status: "To Do"}, 
    {id:30,title: "Deploy App", description: "Host the app on a platform", status: "Completed"}
  ];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
})

app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if(!task)
  {return res.status(404).json({message:"not found"})};
  res.json(task);
})

app.put("/api/tasks/:id", (req, res) => {
  const id  = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task){
    return res.status(404).json({message:"Task Not Found"})
  }
  task.status = req.body.status;
  res.json(task);
})

app.delete("/api/tasks/:id", (req, res) =>{
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id)
  if(taskIndex === -1)
  {
    return res.status(404).json({message:"Task Not Found"})
  }
  const deletedTask = tasks.splice(taskIndex,1);
  res.json(deletedTask[0]); 
})
//Our API Route(for testing Backend)
app.get("/", (req, res) => {
  res.send("Backend is Working!!")
});


//start the server and listen to port 5000
app.listen(5000,() => {console.log("Server is Running on Port 5000")});




