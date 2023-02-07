import {FaTimes} from "react-icons/fa"
const task = ({task,onDelete,changeRem}) => {
  return (
    <div className={`task ${task.reminder? 'reminder':''}`} onDoubleClick={()=>changeRem(task.id)}>
      <h3>{task.text} <FaTimes style={{color:"red",cursor:'pointer'
    }} onClick={()=>(onDelete(task))}/></h3>
      <p>{task.day}</p>
    </div>
  )
}

export default task
