import { useState } from "react";
function AddTask (props){
  const [title,setTitle]= useState("");
  const [desc,setDesc] = useState("");
  async function handleSubmit(e){
    e.preventDefault();
    if (!title.trim()) return;
    console.log("Form Submitted!");
    const newTask ={
      id:Date.now(),
      title:title,
      description:desc,
      status:"To Do"
    };

    try{
    const response = await fetch("http://localhost:5000/api/tasks",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(newTask)
    });

    const data = await response.json();
    props.onAddTask(data);
  }catch(error)
  {
    console.log(error);
  }
}
  return (
    <div>
      <h2>ADD TASK</h2>
      <form onSubmit={handleSubmit}>
      <label>Add Title:</label>
      <input type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)} />
      <br></br>
      <br></br>
      <label>Add Description:</label>
      <input type="text"
      value={desc}
      onChange={(e) => setDesc(e.target.value)} /> 
      <br></br>
      <button type="submit">Add Task</button>
      </form>
    </div>

  );
}
export default AddTask;