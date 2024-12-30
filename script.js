document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm"); // Form for adding tasks
  const taskInput = document.getElementById("taskInput"); // Input field for task text
  const taskCategory = document.getElementById("taskCategory"); // Dropdown menu for categories
  const customCategory = document.getElementById("customCategory"); // Input field for custom categories
  const taskPriority = document.getElementById("taskPriority"); // Dropdown menu for task priority
  const tasksList = document.getElementById("tasksList"); // Container for displaying tasks

  // Function to create a divider between tasks
  const createDivider = () => {
    const divider = document.createElement("hr");
    divider.style.border = "0.5px solid #ddd";
    return divider;
  };

  // Function to add a task
  const addTask = (taskText, category, priority) => {
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
      taskTextElement.style.textDecoration =
        taskTextElement.style.textDecoration === "line-through"
          ? "none"
          : "line-through";
    });

    // Remove button functionality
    removeBtn.addEventListener("click", () => {
      taskContainer.remove();
    });
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
});
