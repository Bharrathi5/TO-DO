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
  const text = document.getElementById("inputTask").value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    updateTaskList();
    updateStats();
  }
  updateTaskList();
  updateStats();
  saveTask();
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
  const progress = (completedTasks / totalTask) * 100;
  const progressBar = document.getElementById("progress");
  progressBar.setAttribute(
    "style",
    "background-color: rgb(0, 255, 102); height: 13px; margin: 20px 0px; border-radius: 7px;"
  );
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
                            }/>
                            <p>${task.text}</P>
                        </div>
                        <div id="taskIcon">
                            <span class="material-symbols-outlined" onClick="editTask(${index})">edit</span>
                            <span class="material-symbols-outlined" onClick="deleteTask(${index})">delete</span>
                        </div>
                    <div> `;
    taskItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(taskItem);
  });
};

document.getElementById("addButton").addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});
