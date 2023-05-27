    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const deleteCompletedButton = document.getElementById('deleteCompletedButton');
    
    taskForm.addEventListener('submit', addTask);
    deleteCompletedButton.addEventListener('click', deleteCompletedTasks);
    
    let tasks = [];
    let taskId = 1;
    
    function addTask(event) {
      event.preventDefault();
      
      const taskText = taskInput.value.trim();
      
      if (taskText !== '') {
        const task = {
          id: taskId,
          title: taskText,
          completed: false
        };
        
        tasks.push(task);
        
        renderTask(task);
        
        taskId++;
        
        taskInput.value = '';
      }
    }
    
    function renderTask(task) {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');
      taskItem.setAttribute('data-task-id', task.id);
      
      const taskCheckbox = document.createElement('input');
      taskCheckbox.type = 'checkbox';
      taskCheckbox.addEventListener('change', () => toggleTaskCompletion(task.id));
      taskItem.appendChild(taskCheckbox);
      
      const taskTextSpan = document.createElement('span');
      taskTextSpan.textContent = task.title;
      taskItem.appendChild(taskTextSpan);
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => deleteTask(task.id));
      taskItem.appendChild(deleteButton);
      
      if (task.completed) {
        taskItem.classList.add('completed');
        taskCheckbox.checked = true;
      }
      
      taskList.appendChild(taskItem);
    }
    
    function toggleTaskCompletion(taskId) {
      const task = tasks.find(task => task.id === taskId);
      const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
      
      task.completed = !task.completed;
      
      if (task.completed) {
        taskItem.classList.add('completed');
      } else {
        taskItem.classList.remove('completed');
      }
    }
    
    function deleteTask(taskId) {
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
        taskList.removeChild(taskItem);
      }
    }
    
    function deleteCompletedTasks() {
      const completedTasks = tasks.filter(task => task.completed);
      
      completedTasks.forEach(task => {
        const taskItem = document.querySelector(`li[data-task-id="${task.id}"]`);
        taskList.removeChild(taskItem);
      });
      
      tasks = tasks.filter(task => !task.completed);
    }