const taskContainer = document.querySelector('.taskList');
const clearTasks = document.querySelector('.clear');

const updateStatus = (id) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].index.toString() === id.toString()) {
      if (tasks[i].status === false) {
        tasks[i].status = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } else {
        tasks[i].status = false;
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
};

const clearMarked = () => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter((e) => e.status === false);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

taskContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    const { id } = e.target;
    const checkbox = e.target;
    const sibling = checkbox.closest('.task-wrap').querySelector('.task-text');
    if (checkbox.checked) {
      sibling.classList.add('completed');
      updateStatus(id);
    } else {
      sibling.classList.remove('completed');
      updateStatus(id);
    }
  }
});

clearTasks.addEventListener('click', (e) => {
  //
  clearMarked();
  const clear = e.target;
  const sibling = clear.closest('.list-container').querySelectorAll('.task-text');
  sibling.forEach((e) => {
    if (e.classList.contains('completed')) {
      e.parentElement.parentElement.parentElement.remove();
    }
  });
});