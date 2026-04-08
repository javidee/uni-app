import { getTasks, saveTasks } from './storage.js'

export function initApp() {
  const root = document.querySelector('#app')
  const tasks = getTasks()

  root.innerHTML = `
    <div class="container">
      <header class="header">
        <h1>Task Manager</h1>
        <p class="subtitle">Simple MVP for future labs and deploys</p>
        <span class="status-badge">
          ${import.meta.env.VITE_APP_STATUS || 'DEV'}
        </span>
      </header>

      <section class="card">
        <h2>Add task</h2>
        <div class="form-row">
          <input id="taskInput" type="text" placeholder="Enter task" />
          <button id="addBtn">Add</button>
        </div>
      </section>

      <section class="card">
        <div class="tasks-header">
          <h2>Tasks</h2>
          <span id="taskCount">0</span>
        </div>
        <ul id="taskList" class="task-list"></ul>
      </section>
    </div>
  `

  const input = document.getElementById('taskInput')
  const addBtn = document.getElementById('addBtn')
  const list = document.getElementById('taskList')
  const taskCount = document.getElementById('taskCount')

  function renderTasks() {
    list.innerHTML = ''

    if (tasks.length === 0) {
      list.innerHTML = `<li class="empty-state">No tasks yet</li>`
      taskCount.textContent = '0'
      return
    }

    tasks.forEach((task, index) => {
      const li = document.createElement('li')
      li.className = `task-item ${task.completed ? 'completed' : ''}`

      li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
          <button class="complete-btn" data-index="${index}">
            ${task.completed ? 'Undo' : 'Done'}
          </button>
          <button class="delete-btn" data-index="${index}">
            Delete
          </button>
        </div>
      `

      list.appendChild(li)
    })

    taskCount.textContent = String(tasks.length)

    document.querySelectorAll('.complete-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.index)
        tasks[index].completed = !tasks[index].completed
        saveTasks(tasks)
        renderTasks()
      })
    })

    document.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.index)
        tasks.splice(index, 1)
        saveTasks(tasks)
        renderTasks()
      })
    })
  }

  function addTask() {
    const text = input.value.trim()
    if (!text) return

    tasks.push({
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    })

    saveTasks(tasks)
    renderTasks()
    input.value = ''
    input.focus()
  }

  addBtn.addEventListener('click', addTask)

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTask()
    }
  })

  renderTasks()
}