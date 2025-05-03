const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


function addTask(){
  const taskText =taskInput.value.trim();
    if (taskText !== ''){
      const li = document.createElement('li');

      //create a span to wrap the task text
      const span = document.createElement('span');
      span.textContent = taskText;
      
//add a dbclick edit functionality
      span.addEventListener('dblclick',()=>{
       const input = document.createElement('input')
       input.type = 'text';
       input.value =span.textContent;
       input.style.marginRight = '10px'


       li.replaceChild(input, span);
       input.focus();


        const saveEdit =()=>{
          span.textContent = input.value.trim() || span.textContent;
          li.replaceChild(span, input);
          saveTaskToLocalStorage();
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (event)=>{
          if (event.key ==='Enter'){
            saveEdit();
          }
        })
      })
      li.appendChild(span); // append the span containing task text

      //mark task as completed 
    li.addEventListener('click',()=>{
      li.classList.toggle('completed');
    })
     


      //add a time stamp
    const timeStamp =document.createElement('small');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    const formattedDate = now.toLocaleDateString();
    timeStamp.textContent = `Added: ${formattedTime} on ${formattedDate}`;
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
        const confirmClear = confirm('Are you sure you want to delete all tasks?');
        if (confirmClear){
      taskList.innerHTML = '';
      localStorage.removeItem('tasks') 
      //clears all stored tasks
    }});

document.body.appendChild(clearAllButton);

loadTasksFromLocalStorage();