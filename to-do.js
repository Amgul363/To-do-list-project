const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


function addTask(){
  const taskText =taskInput.value.trim();
    if (taskText !== ''){
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = taskText;
      li.appendChild(span);



      //mark task as completed 
    li.addEventListener('click',()=>{
      li.classList.toggle('completed');
    })
     


      //add a time stamp
    const timeStamp =document.createElement('small');
    timeStamp.textContent = `(added: ${new Date().toLocaleTimeString()})`
    li.appendChild(timeStamp)

  //creatint a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌'//delete button symbol
    deleteButton.addEventListener('click',()=>{
      li.remove();
      saveTaskToLocalStorage();

      //remove task when clicked
    });

    

    //append/add delete button to the list item

    li.appendChild(deleteButton);

    //append the new task li to the task list ul

    taskList.appendChild(li);

    //clear the input after adding task
    taskInput.value = '';

    saveTaskToLocalStorage();
    }
}
addTaskButton.addEventListener('click', ()=>{
  addTask();
}
  
)

taskInput.addEventListener('keydown',(event)=>{
if (event.key==='Enter'){
  //prevent default
  event.preventDefault();
  addTask();
}
});

//Add a clear  all button
const clearAllButton = document.createElement('button');
clearAllButton.textContent = 'Clear All';
clearAllButton.style.marginTop = '20px';
clearAllButton.addEventListener('click',()=>{
  taskList.innerHTML = '';
});

document.body.appendChild(clearAllButton);

loadTasksFromLocalStorage();