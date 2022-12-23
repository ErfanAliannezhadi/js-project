const form = document.querySelector("#task-form");
const taskinput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const tasklist = document.querySelector(".list-group");
const clearbtn = document.querySelector(".clear-tasks");

function load_content() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";
    li.appendChild(document.createTextNode(task));
    const i = document.createElement("i");
    i.className = "fas fa-times text-danger me-auto delete-item";
    li.appendChild(i);
    tasklist.appendChild(li);
  });
}

function save_task(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addtask(e) {
  if (taskinput.value === "") {
    alert("برای افزودن تسک در ابتدا تسک را وارد کنید");
  } else {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";
    li.appendChild(document.createTextNode(taskinput.value));
    const i = document.createElement("i");
    i.className = "fas fa-times text-danger me-auto delete-item";
    li.appendChild(i);
    tasklist.appendChild(li);
    save_task(taskinput.value);
    taskinput.value = "";
    e.preventDefault();
  }
}

function removetask(e) {
  if (e.target.classList.contains("delete-item")) {
    if (confirm("آیا برای حذف تسک مطمن هستید؟")) {
      e.target.parentElement.remove();
      tasks = JSON.parse(localStorage.getItem('tasks')) 
      tasks.forEach(function (task, index) {
        if (e.target.parentElement.textContent === task){
          tasks.splice(index, 1);
        }
      })
      localStorage.setItem('tasks', JSON.stringify(tasks))
      }}}
function cleartask(e) {
  tasklist.innerHTML = "";
  localStorage.removeItem('tasks')
}

function filtertask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".list-group-item").forEach(function (task) {
    const item = task.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.classList.add("d-flex");
    } else {
      task.classList.remove("d-flex");
      task.style.display = "none";
    }
  });
}
load_content()
form.addEventListener("submit", addtask);
tasklist.addEventListener("click", removetask);
clearbtn.addEventListener("click", cleartask);
filter.addEventListener("keyup", filtertask);
