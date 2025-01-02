document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm"); // Form for adding tasks
  const taskInput = document.getElementById("taskInput"); // Input field for task text
  const taskCategory = document.getElementById("taskCategory"); // Dropdown menu for categories
  const customCategory = document.getElementById("customCategory"); // Input field for custom categories
  const taskPriority = document.getElementById("taskPriority"); // Dropdown menu for task priority
  const tasksList = document.getElementById("tasksList"); // Container for displaying tasks
  const filterCategory = document.getElementById("filterCategory"); // Dropdown menu for category filter
  const filterStatus = document.getElementById("filterStatus"); // Dropdown menu for status filter
  const applyFilters = document.getElementById("applyFilters"); // Button to apply filters

  let tasks = []; // Store tasks locally

  // Load tasks from Local Storage on page load
  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = savedTasks; // Update local tasks array
    renderTasks(tasks); // Render tasks on load
  };

  // Save tasks to Local Storage
  const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Function to add a task
  const addTask = (
    taskText,
    category,
    priority,
    completed = false,
    saveToStorage = true
  ) => {
    if (!taskText.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    const task = {
      text: taskText,
      category,
      priority,
      completed,
    };

    tasks.push(task);
    if (saveToStorage) saveTasksToLocalStorage();
    renderTasks(tasks);
  };

  // Render Tasks
  const renderTasks = (tasksToRender) => {
    tasksList.innerHTML = ""; // Clear task list
    tasksToRender.forEach((task, index) => {
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task");

      // Apply styling based on priority
      switch (task.priority) {
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

      const taskTextElement = document.createElement("span");
      taskTextElement.textContent = `${task.text} [${task.category}] - Priority: ${task.priority}`;
      taskTextElement.style.flexGrow = "1";
      if (task.completed) {
        taskTextElement.style.textDecoration = "line-through";
      }

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = task.completed ? "Undo" : "Complete";
      toggleBtn.classList.add("toggle-btn");

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");

      // Append elements
      taskContainer.appendChild(taskTextElement);
      taskContainer.appendChild(toggleBtn);
      taskContainer.appendChild(removeBtn);
      tasksList.appendChild(taskContainer);

      // Toggle task completion
      toggleBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasksToLocalStorage();
        renderTasks(tasks);
      });

      // Remove task with confirmation
      removeBtn.addEventListener("click", () => {
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (confirmed) {
          tasks.splice(index, 1);
          saveTasksToLocalStorage();
          renderTasks(tasks);
        }
      });
    });
  };

  // Apply Filters
  applyFilters.addEventListener("click", () => {
    let filteredTasks = tasks;

    const categoryFilter = filterCategory.value;
    const statusFilter = filterStatus.value;

    if (categoryFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === categoryFilter
      );
    }

    if (statusFilter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (statusFilter === "incomplete") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    renderTasks(filteredTasks);
  });

  // Event listener for form submission
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    let category = taskCategory.value;
    const priority = taskPriority.value;

    if (category === "Custom" && customCategory.value.trim()) {
      category = customCategory.value.trim();
    }

    addTask(taskText, category, priority);
    taskInput.value = "";
    customCategory.value = "";
  });

  // Load tasks on page load
  loadTasks();
});
