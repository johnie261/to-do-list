const taskContainer = document.querySelector('.taskList');
const taskDesc = document.querySelector('.desc');
const formInput = document.querySelector('.formInput');
//const clearTasks = document.querySelector('.clear');

let tasks = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];

const showTasks = () => {
  taskContainer.innerHTML = '';

  tasks.forEach((el) => {
    if (el.status == true) {
      taskContainer.innerHTML += `
      <div class="task-wrap" id="${el.index}">
      <div class="wrapper">
          <form class="completed-form">
              <input class="checkbox" id="${el.index}" type="checkbox" checked>
              <input class="completed task-text" id="list${el.index}" value="${el.description}" readonly>
          </form>
      </div>
      <div class="task-icons">
        <i class="fa-solid fa-pen-to-square edit " id="edit${el.index}" onclick="editList(${el.index});"></i>
        <i class="fa-solid fa-floppy-disk save hide" id="save${el.index}" onclick="saveList(${el.index});"></i>
        <i id="removeicon" onclick="Remove(${el.index});" class="fa-solid fa-trash"></i>
      </div>
    </div>`;
    } else {
      taskContainer.innerHTML += `
      <div class="task-wrap" id="${el.index}">
      <div class="wrapper">
          <form class="completed-form">
              <input class="checkbox" id="${el.index}" type="checkbox">
              <input class="task-text" id="list${el.index}" value="${el.description}" readonly>
          </form>
      </div>
      <div class="task-icons">
        <i class="fa-solid fa-pen-to-square edit " id="edit${el.index}" onclick="editList(${el.index});"></i>
        <i class="fa-solid fa-floppy-disk save hide" id="save${el.index}" onclick="saveList(${el.index});"></i>
        <i id="removeicon" onclick="Remove(${el.index});" class="fa-solid fa-trash"></i>
      </div>
    </div>`;
    }
  
    taskDesc.value = '';
  });
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

window.Remove = (index) => {
  const storedData = localStorage.getItem('tasks');
  tasks = JSON.parse(storedData);
  tasks.splice(index, 1);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  showTasks();
};

window.editList = (index) => {
  const editBtn = document.getElementById(`edit${index}`);
  const saveBtn = document.getElementById(`save${index}`);

  saveBtn.style.display = 'inline-block';
  editBtn.style.display = 'none';
  const specList = document.getElementById(`list${index}`);
  specList.removeAttribute('readonly');
  const { length } = specList.value;
  specList.setSelectionRange(length, length);
  specList.focus();
  return specList;
};

window.saveList = (index) => {
  const editBtn = document.getElementById(`edit${index}`);
  const saveBtn = document.getElementById(`save${index}`);

  saveBtn.style.display = 'none';
  editBtn.style.display = 'inline-block';

  const specList = document.getElementById(`list${index}`);
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[index].description = specList.value;

  localStorage.setItem('tasks', JSON.stringify(tasks));
  showTasks();
};

//interactive

 window.onload = () => {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  showTasks(tasks);
};