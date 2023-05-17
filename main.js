const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function createNewTask(taskText) {
    const newTaskItem = document.createElement("li");
    newTaskItem.innerHTML = `
        <input type="checkbox" class="regular-checkbox">
        <span class="task-text">${taskText}</span>
        <button type="button" class="far fa-trash-alt"></button>
    `;
    taskList.appendChild(newTaskItem);

    const deleteButton = newTaskItem.querySelector(".far.fa-trash-alt");
    deleteButton.addEventListener("click", function() {
        newTaskItem.remove();
        saveTasks();
    });

    const checkbox = newTaskItem.querySelector(".regular-checkbox");
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            newTaskItem.classList.add("completed");
            newTaskItem.querySelector(".task-text").classList.add("completed");
        } else {
            newTaskItem.classList.remove("completed");
            newTaskItem.querySelector(".task-text").classList.remove("completed");
        }
        saveTasks();
    });
    saveTasks();
}

function saveTasks() {
    const taskItems = taskList.querySelectorAll("li");
    const tasks = [];
    for (let i = 0; i < taskItems.length; i++) {
        const taskText = taskItems[i].querySelector(".task-text").innerText;
        const isCompleted = taskItems[i].classList.contains("completed");
        tasks.push({text: taskText, completed: isCompleted});
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].text;
        const isCompleted = tasks[i].completed;
        createNewTask(taskText);
        const newTaskItem = taskList.lastChild;
        if (isCompleted) {
            newTaskItem.classList.add("completed");
            newTaskItem.querySelector(".regular-checkbox").checked = true;
        }
    }
}

addTaskButton.addEventListener("click", function(event) {
    event.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        createNewTask(taskText);
        newTaskInput.value = "";
    }
});

newTaskInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});

loadTasks();
