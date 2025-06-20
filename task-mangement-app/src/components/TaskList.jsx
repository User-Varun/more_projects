import myData from "../data.json"
import  addTaskToLocalStorage from "../components/addTaskToLocalStorage"


const newObj =   { "title" : "test task",
    "description" : "testing!!!"
   } 


function getTask(id){
  return localStorage.getItem(id);
}


function TaskList(){
    
    // myData.tasks.map(data => setTask(data))

    // const data = JSON.stringify(myData.tasks);

    // localStorage.setItem('tasks' , data);
   

    const tasksListArr =  JSON.parse(getTask('tasks'));

    return(

       <div className="flex justify-center flex-wrap p-[2.4rem] gap-[1.3rem]  ">
        { tasksListArr?.map(task => 
             
             <TaskCard task={task} key={task.title} />
 
         ) }
       </div>
    )
}


function TaskCard({task}){
    
    // setTask(task);  
    const {title , description} = task;


    return(
        <div className=' max-h-fit flex   min-w-2xs flex-col gap-[1rem] p-[0.6rem] w-2xs bg-[#fff] text-[#202124] rounded-[8px] border-[0.1px] border-solid border-[#e0e0e0]
        shadow-2xs'  >
            <h2 className='font-semibold whitespace-pre-wrap'>{title}</h2>
            <p className="whitespace-pre-wrap" >{description}</p>
            <div className='flex justify-center gap-[1rem] group'>
            <button className="p-[0.5rem] bg-[gray]  min-w-[8rem] rounded-[2rem] text-[#fff] hidden group-hover:block">Pin</button>
            <button className="p-[0.5rem] bg-[#FF6366]  min-w-[8rem] rounded-[2rem] text-[#fff] ">Delete</button>

            </div>
        </div>
    )
}

export default TaskList;