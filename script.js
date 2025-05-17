document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);
  input.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.style.marginLeft = "10px";
checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
});
li.appendChild(checkbox);
  deleteBtn.onclick = function () {
    li.remove();
    deleteTask(taskText);
  };

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
}
document.getElementById("toggleMode").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  
    // Save mode in localStorage
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark ? "true" : "false");
  });
  
  // Load theme from localStorage
  window.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
      document.body.classList.add("dark");
    }
  });
  