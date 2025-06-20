import '../index.css'
import {useState } from 'react'
import {useNavigate } from 'react-router-dom';

import addTaskToLocalStorage  from "../components/addTaskToLocalStorage"


function AddTasksPage(){
   
    const [title , setTitle]= useState('');
    const [description , setDescription] = useState('');
    const navigate = useNavigate()


   const taskObj = {
     title : title,
     description : description
   }


   function handleChange(){
    addTaskToLocalStorage(taskObj)
    setTitle("");
    setDescription("");

    navigate('/')
 }

   
    return(
    <div  className='flex flex-col gap-[1rem] decoration-none   mt-[3rem] justify-self-center min-w-xl p-[0.7rem]  border-[0.1px] border-solid border-[#e0e0e0] rounded-[8px]  ' >
   
    <input type='text' placeholder='Title' className='text-[#666666] border-[0px]' onChange={(e) => setTitle(e.target.value)}  value={title}  />
 
    <textarea  placeholder='Take a note...' className='text-[#666666]'  onChange={(e) => setDescription(e.target.value)}  value={description}  />

    <button  className='w-min p-[0.3rem] text-[#0d0c0c] bg-[#4CA3ED] rounded-[1rem]' onClick={handleChange}  >done</button>
  
    </div>
    )
}

export default AddTasksPage;