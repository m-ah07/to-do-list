function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    // Create new list item
    const li = document.createElement("li");

    // Task text
    li.textContent = taskText;

    // Action buttons
    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => li.classList.toggle("completed");

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => li.remove();

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    taskList.appendChild(li);
    taskInput.value = "";
}
