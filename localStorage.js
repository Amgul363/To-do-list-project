function saveTaskToLocalStorage (){
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach((li)=>{
    tasks.push({
      text: li.querySelector('span').textContent.trim(),
      completed: li.classList.contains('completed'),
      time: li.querySelector('small')?.textContent || ''
    });
  })
localStorage.setItem('tasks', JSON.stringify(tasks));

}

function loadTasksFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks) {
    storedTasks.forEach(task => {
      
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = task.text;
      li.appendChild(span);

      const timeStamp = document.createElement('small');
      timeStamp.textContent = task.time || '';
      li.appendChild(timeStamp);


      if (task.completed) {
        li.classList.add('completed');
      }

      // Toggle complete
      li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTaskToLocalStorage();
      });

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '❌';
      deleteButton.style.marginLeft = '10px';
      deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        li.remove();
        saveTaskToLocalStorage();
      });

      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }
}

