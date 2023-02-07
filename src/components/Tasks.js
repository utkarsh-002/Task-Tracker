import Task from "./task";

const Tasks = ({tasks,onDelete,changeRem}) => {
  return (
    <div>
    {tasks.map((task)=>(
        <Task key={task.id}  task={task} onDelete={onDelete} changeRem={changeRem}/>
      ))}
    </div>
  )
}

export default Tasks
