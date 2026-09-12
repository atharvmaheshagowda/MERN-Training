// bring express in Node.js
const express = require("express")


// create express app using What we imported
const app = express();

  const tasks = [
    {id:1,title: "Learn React", description: "Understanding Components", status: "In Progress"},
    {id:2,title: "Learn MongoDB", description: "Create a simple React app", status: "To Do"}, 
    {id:3,title: "Deploy App", description: "Host the app on a platform", status: "Completed"}
  ];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

//Our API Route(for testing Backend)
app.get("/", (req, res) => {
  res.send("Backend is Working!!")
});


//start the server and listen to port 5000
app.listen(5000,() => {console.log("Server is Running on Port 5000")});




