document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm"); // Form for adding tasks
  const taskInput = document.getElementById("taskInput"); // Input field for task text
  const taskCategory = document.getElementById("taskCategory"); // Dropdown menu for categories
  const customCategory = document.getElementById("customCategory"); // Input field for custom categories
  const taskPriority = document.getElementById("taskPriority"); // Dropdown menu for task priority
  const tasksList = document.getElementById("tasksList"); // Container for displaying tasks

  // Load tasks from Local Storage on page load
  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
      addTask(task.text, task.category, task.priority, task.completed, false);
    });
  };

  // Save tasks to Local Storage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Add or update a task in Local Storage
  const updateTaskInLocalStorage = (taskText, completed) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((t) => t.text === taskText);
    if (task) {
      task.completed = completed;
    }
    saveTasksToLocalStorage(tasks);
  };

  // Remove task from Local Storage
  const removeTaskFromLocalStorage = (taskText) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter((task) => task.text !== taskText);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Function to create a divider between tasks
  const createDivider = () => {
    const divider = document.createElement("hr");
    divider.style.border = "0.5px solid #ddd";
    return divider;
  };

  // Function to add a task
  const addTask = (taskText, category, priority, completed = false, saveToStorage = true) => {
    if (!taskText.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    // Create a container for the task
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task");

    // Apply styling based on priority
    switch (priority) {
      case "low":
        taskContainer.style.backgroundColor = "#dff0d8";
        break;
      case "medium":
        taskContainer.style.backgroundColor = "#fcf8e3";
        break;
      case "high":
        taskContainer.style.backgroundColor = "#f2dede";
        break;
    }

    // Create task text element
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = `${taskText} [${category}] - Priority: ${priority}`;
    taskTextElement.style.flexGrow = "1";
    if (completed) {
      taskTextElement.style.textDecoration = "line-through";
      taskTextElement.classList.add("completed");
    }

    // Create toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    toggleBtn.classList.add("toggle-btn");

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    // Append elements to the task container
    taskContainer.appendChild(taskTextElement);
    taskContainer.appendChild(toggleBtn);
    taskContainer.appendChild(removeBtn);

    // Add a divider
    tasksList.appendChild(createDivider());

    // Append the task container to the list
    tasksList.appendChild(taskContainer);

    // Toggle button functionality
    toggleBtn.addEventListener("click", () => {
      const isCompleted = taskTextElement.style.textDecoration === "line-through";
      taskTextElement.style.textDecoration = isCompleted ? "none" : "line-through";
      taskTextElement.classList.toggle("completed");
      updateTaskInLocalStorage(taskText, !isCompleted);
    });

    // Remove button functionality with confirmation
    removeBtn.addEventListener("click", () => {
      const confirmed = confirm("Are you sure you want to delete this task?");
      if (confirmed) {
        taskContainer.remove();
        removeTaskFromLocalStorage(taskText); // Remove from Local Storage
      }
    });

    // Save task to Local Storage if not already saved
    if (saveToStorage) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: taskText, category, priority, completed });
      saveTasksToLocalStorage(tasks);
    }
  };

  // Event listener for form submission
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload
    const taskText = taskInput.value.trim();
    let category = taskCategory.value;
    const priority = taskPriority.value; // Get priority value

    // Use custom category if specified
    if (category === "Custom" && customCategory.value.trim()) {
      category = customCategory.value.trim();
    }

    addTask(taskText, category, priority); // Add the task
    taskInput.value = ""; // Clear input field
    customCategory.value = ""; // Clear custom category field
  });

  // Load tasks on page load
  loadTasks();
});
