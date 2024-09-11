// script.js
document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to render the tasks
  const renderTasks = () => {
      todoList.innerHTML = '';
      tasks.forEach((task, index) => {
          const li = document.createElement('li');
          li.innerHTML = `
              <span class="todo-item">${task}</span>
              <button class="delete-btn" data-index="${index}">Delete</button>
          `;
          todoList.appendChild(li);
      });
  };

  // Add new task
  const addTask = () => {
      const task = todoInput.value.trim();
      if (task) {
          tasks.push(task);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
          todoInput.value = ''; // clear input field
      }
  };

  // Delete task
  const deleteTask = (index) => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
  };

  // Event listener for the Add button
  addBtn.addEventListener('click', addTask);

  // Event listener for delete buttons
  todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
          const index = e.target.getAttribute('data-index');
          deleteTask(index);
      }
  });

  // Initial rendering of tasks
  renderTasks();
});
