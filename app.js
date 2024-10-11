document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }
});

let tasks = [];

const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const text = document.getElementById("inputTask");
  const input = text.value.trim();

  if (input) {
    tasks.push({ text: input, completed: false });
    updateTaskList();
    updateStats();
    saveTask();
    text.value = "";
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveTask();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
};

const editTask = (index) => {
  const input = document.getElementById("inputTask");
  input.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTask = tasks.length;
  const progress = totalTask === 0 ? 0 : (completedTasks / totalTask) * 100;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;
  document.getElementById(
    "taskCount"
  ).innerHTML = `${completedTasks} / ${totalTask}`;
};

const updateTaskList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
                    <div class="taskList">
                        <div class="listItem ${
                          task.completed ? "completed" : ""
                        }">
                            <input type="checkbox" class="checkbox" ${
                              task.completed ? "checked" : ""
                            } onchange="toggleTaskComplete(${index})"/>
                            <p>${task.text}</P>
                        </div>
                        <div id="taskIcon">
                            <span class="material-symbols-outlined" onClick="editTask(${index})">edit</span>
                            <span class="material-symbols-outlined" onClick="deleteTask(${index})">delete</span>
                        </div>
                    <div> `;
    taskList.append(taskItem);
  });
};

document.getElementById("addButton").addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});
