
function addTaskToLocalStorage(taskObj){
  
    const data = localStorage.getItem('tasks')
  
    const existingTasks = JSON.parse(data);  
  
    const newItem =  existingTasks ? existingTasks : [];
  
    newItem.push(taskObj);
  
    localStorage.setItem("tasks" , JSON.stringify(newItem));
  }

export default addTaskToLocalStorage;