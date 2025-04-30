const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


addTaskButton.addEventListener('click',()=>{
 const taskText =taskInput.value.trim();
  if (taskText !== ''){
    const li = document.createElement('li');
    li.textContent = taskText

//creatint a delete button
   const deleteButton = document.createElement('button');
   deleteButton.textContent = '❌'//delete button symbol
   deleteButton.addEventListener('click',()=>{
    li.remove();
    //remove task when clicked
   });







  }




})
