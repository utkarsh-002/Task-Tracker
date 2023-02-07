import Header from "./components/Header"
import { useState,useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About'


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])
useEffect(()=>{
  const getTasks=async ()=>{
    const taskFromServer = await fetchData()
    setTasks(taskFromServer)
  }
  getTasks()
},[]);

const fetchData=async ()=>{
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  return data;
}

const fetchTask=async (id)=>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data;
}


  const del=async (task)=>{
    await fetch(`http://localhost:5000/tasks/${task.id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter((tsk)=>(tsk!==task)));
  }

  const changeRem=async (id)=>{
    const taskToTogle = await fetchTask(id);
    taskToTogle.reminder= !taskToTogle.reminder;
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(taskToTogle),
    })
    const data = await res.json()
    setTasks(tasks.map((task)=>
      task.id===id ?{...task,reminder:data.reminder}:
      task 
    ))
  }

  const addTask=async (task)=>{
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data =await  res.json();
    setTasks([...tasks,data])
    // const id = tasks[tasks.length-1]+1;
    // const newTask = {id,...task};
    // setTasks([...tasks,newTask])
  }

  return (
    <Router>
        <div className="container">
        <Header title={"Task Tracker"} onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Routes>
        <Route exact path='/' element={<>
        {showAddTask && <AddTask onSubmit={addTask} showAdd={showAddTask} onAdd={()=>setShowAddTask(!showAddTask)}/>}
        { tasks.length >0 ? (<Tasks tasks={tasks} onDelete={del} changeRem={changeRem}/>)
          :(<h3>No Tasks Remaining</h3>)
        }
        </>
  }/>
        <Route exact path="/about" element={<About/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router> 
  );
}

export default App;
