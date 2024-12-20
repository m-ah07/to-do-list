document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const prioritySelector = document.getElementById("prioritySelector");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    let tasks = [];

    const renderTasks = (filter = "all") => {
        taskList.innerHTML = "";
        const filteredTasks = tasks.filter((task) => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        });

        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? "completed" : ""}`;
            li.innerHTML = `
                <span>${task.text} (${task.priority})</span>
                <div>
                    <button onclick="toggleTask(${index})">Toggle</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        const priority = prioritySelector.value;
        if (text) {
            tasks.push({ text, priority, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    };

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    addTaskButton.addEventListener("click", addTask);
    document.getElementById("filterAll").addEventListener("click", () => renderTasks("all"));
    document.getElementById("filterCompleted").addEventListener("click", () => renderTasks("completed"));
    document.getElementById("filterPending").addEventListener("click", () => renderTasks("pending"));

    renderTasks();
});
