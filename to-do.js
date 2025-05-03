const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Create a new task and append it to the task list
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    taskInput.value = ''; // Clear the input field
    saveTaskToLocalStorage();
  }
}

// Create a task element (li) with text, timestamp, and delete button
function createTaskElement(taskText) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;

  // Add edit functionality (dblclick to edit task)
  span.addEventListener('dblclick', () => editTask(span, li));

  // Mark task as completed (click to toggle)
  li.addEventListener('click', () => li.classList.toggle('completed'));

  // Add timestamp
  const timeStamp = createTimestamp();
  li.appendChild(timeStamp);

  // Create delete button
  const deleteButton = createDeleteButton(li);
  li.appendChild(deleteButton);

  // Add span to li
  li.appendChild(span);
  
  return li;
}

// Edit task function (double-click to edit)
function editTask(span, li) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.textContent;
  li.replaceChild(input, span);
  input.focus();

  // Save edited task when input loses focus or Enter is pressed
  input.addEventListener('blur', () => saveEditedTask(input, span, li));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      saveEditedTask(input, span, li);
    }
  });
}

// Save edited task
function saveEditedTask(input, span, li) {
  span.textContent = input.value.trim() || span.textContent;
  li.replaceChild(span, input);
  saveTaskToLocalStorage();
}

// Create timestamp for the task
function createTimestamp() {
  const timeStamp = document.createElement('small');
  const now = new Date();
  const formattedTime = now.toLocaleTimeString();
  const formattedDate = now.toLocaleDateString();
  timeStamp.textContent = `Added: ${formattedTime} on ${formattedDate}`;
  return timeStamp;
}

// Create a delete button for each task
function createDeleteButton(li) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.addEventListener('click', () => {
    li.remove();
    saveTaskToLocalStorage(); // Update localStorage when a task is deleted
  });
  return deleteButton;
}

// Save tasks to localStorage
function saveTaskToLocalStorage() {
  const tasks = [];
  const taskItems = taskList.querySelectorAll('li');
  taskItems.forEach((item) => {
    const span = item.querySelector('span');
    const timeStamp = item.querySelector('small').textContent;
    tasks.push({ text: span.textContent, timeStamp: timeStamp });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    const newTask = createTaskElement(task.text);
    const timeStamp = newTask.querySelector('small');
    timeStamp.textContent = task.timeStamp; // Restore timestamp
  });
}

// Add clear all functionality
const clearAllButton = document.createElement('button');
clearAllButton.textContent = 'Clear All';
clearAllButton.style.marginTop = '20px';
clearAllButton.addEventListener('click', () => {
  const confirmClear = confirm('Are you sure you want to delete all tasks?');
  if (confirmClear) {
    taskList.innerHTML = ''; // Clear all tasks from the list
    localStorage.removeItem('tasks'); // Clear tasks from localStorage
  }
});
document.body.appendChild(clearAllButton);

// Event listeners
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});

// Load tasks from localStorage on page load
loadTasksFromLocalStorage();
