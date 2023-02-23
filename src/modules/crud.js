const taskContainer = document.querySelector('.taskList');
const taskDesc = document.querySelector('.desc');
const formInput = document.querySelector('.formInput');

let tasks = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];

const showTasks = () => {
  taskContainer.innerHTML = '';

  tasks.forEach((el) => {
    taskContainer.innerHTML += `
      <div class="task-wrap">
        <div class="wrapper">
            <form class="completed-form">
            <input class="checkbox" type="checkbox">
            <input id="list${el.index}" class="task-text" value = "${el.description}" onclick="updateList(${el.index});" readonly>
            </form>
        </div>
        <div class="task-icons">
          <i class="fa-solid fa-floppy-disk save hide" id="save${el.index}" onclick="saveList(${el.index});"></i>
          <i id="${el.index}" class="fa-solid fa-trash-can"></i>
        </div>
      </div>`;

      taskDesc.value = '';
  })
};

const addTask = (arr, newTaskInput) => {
  let index;
  const len = arr.length;
  if (len === 0 || len === null) {
    index = 0;
  } else {
    index = arr[len - 1].index + 1;
  }

  const taskItems = { description: newTaskInput, status: false, index };
  tasks.push(taskItems);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

formInput.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTaskInput = taskDesc.value;
  addTask(tasks, newTaskInput);
  showTasks();
});
window.updateList = (index) => {
  const editInput = document.getElementById("list" + index + "");
  editInput.removeAttribute("readonly");
  const length = editInput.value.length;
  editInput.setSelectionRange(length, length);
  editInput.focus();
  return editInput;
}

window.saveList = (index) => {
 const editInput = document.getElementById("list" + index + "");
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[index-1].description = editInput.value;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  //showTasks();
};

const deleteTasks = function (id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter((e) => e.index.toString() !== id.toString());
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
//  showTasks(tasks);
};

taskContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash-can')) {
    const { id } = e.target;
    deleteTasks(id);
    e.target.parentElement.parentElement.remove();
  }
});

window.onload = () => {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  showTasks(tasks);
};