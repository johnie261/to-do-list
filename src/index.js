import './style.css';

const taskContainer = document.querySelector('.taskList');

const tasks = [
  {
    description: 'Go for shopping',
    completed: false,
    index: 3,
  },
  {
    description: 'Finishing up list project',
    completed: true,
    index: 1,
  },
  {
    description: 'Home chores',
    completed: true,
    index: 0,
  },
];

const showTasks = () => {
  const sort = tasks.sort((a, b) => a.index - b.index);
  for (let i = 0; i < sort.length; i += 1) {
    const html = `
        <div class="task-wrapper">
            <form class="completed-form">
                <input class="checkbox" type="checkbox">
            </form>
        <p class="task-text"> ${tasks[i].description}</p>
      </div>`;
    taskContainer.innerHTML += html;
  }
};

document.addEventListener('DOMContentLoaded', showTasks);
