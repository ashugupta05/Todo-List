import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './App.css'

function App() {
  const[todo , setTodo] = useState("")
  const[todos, setTodos] = useState([])
  const[ShowFinished , setShowFinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  const togglefinsihed =(e) => {
    setShowFinished(!ShowFinished)
  }
  

const handleEdit = (e,id)=>
{
 let t =  todos.filter(i=>i.id === id)
  setTodo(t[0].todo)
 let newTodos = todos.filter(item =>
  {
    return item.id!==id
  } );
  setTodos(newTodos)
  saveTols()
}

const saveTols = (params) =>
{
    localStorage.setItem("todos" , JSON.stringify(todos))
}


const handleDelete = (e , id)=>
{
  let newTodos = todos.filter(item =>
  {
    return item.id!==id
  } );
  setTodos(newTodos)
  saveTols()
  }
const handleAdd = ()=>
{
  setTodos([...todos , {id: uuidv4() ,todo , isCompleted: false}])
  setTodo("")
  saveTols()
}
const handleChange=(e)=>
{
  setTodo(e.target.value)
}
const handleCheckbox = (e)=>
{
  let id = e.target.name;
  let index = todos.findIndex(item =>{
    return item.id === id;
  })
  let newTodos = [...todos];
  newTodos[index].isCompleted =!newTodos[index].isCompleted;
  setTodos(newTodos)
  saveTols()

}


  return (
    <>
      <Navbar/>
      <div className=' mx-2 md:container md:mx-auto my-5 p-4 rounded-xl bg-violet-100 min-h-[80vh] w-1/2'>
      <h1 className='font-bold underline text-center text-xl' >iTask - Manage your Todo at one place</h1>
        <div className='addtodo my-5 flex flex-col gap-4'>
        <h2 className='text-xl font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 bg-white'/>
        <button onClick={handleAdd} disabled={todo.length<3}   className='bg-violet-800 hover:bg-violet-900 p-2 disabled:bg-violet-300 py-1 text-sm font-bold text-white rounded-md'>Save</button>
        </div>
        <input onChange={togglefinsihed} className='m-6' type="checkbox"  checked={ShowFinished}/> Show Finished
        <h2 className='text-lg  font-bold'>Your Todos</h2>
        <div className='todos '>
          {todos.map(item=> { 
            return (ShowFinished || !item.isCompleted ) && <div key={item.id} className={"todo flex w-1/2 my-3 justify-between "}>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id=""/>
          <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e , item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' ><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e ,item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
          </div>
          </div>

               } )}
        </div>
      </div>
      
    </>
  )
}

export default App
