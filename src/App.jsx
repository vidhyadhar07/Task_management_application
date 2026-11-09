import { useEffect, useState } from 'react'
import './App.css'
import TaskForm from './components/taskform.jsx'
import TaskList from './components/tasklist.jsx'
import ProgressTracker from './components/progresstracker.jsx'

const getLocalDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function App() {
  const [today, setToday] = useState(getLocalDate)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (!savedTasks) return []

    try {
      const parsedTasks = JSON.parse(savedTasks)
      return Array.isArray(parsedTasks) ? parsedTasks : []
    } catch (error) {
      console.error('Could not load saved tasks:', error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    let timeoutId

    const updateDateAndScheduleRefresh = () => {
      setToday(getLocalDate())
      const now = new Date()
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      )
      timeoutId = window.setTimeout(
        updateDateAndScheduleRefresh,
        nextMidnight.getTime() - now.getTime() + 100,
      )
    }

    const refreshDate = () => {
      window.clearTimeout(timeoutId)
      updateDateAndScheduleRefresh()
    }

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') refreshDate()
    }

    updateDateAndScheduleRefresh()
    window.addEventListener('focus', refreshDate)
    document.addEventListener('visibilitychange', refreshWhenVisible)

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('focus', refreshDate)
      document.removeEventListener('visibilitychange', refreshWhenVisible)
    }
  }, [])

  const addTask = (task) => {
    setTasks((currentTasks) => [...currentTasks, task])
  }

  const updateTask = (updatedTask, index) => {
    setTasks((currentTasks) =>
      currentTasks.map((task, taskIndex) =>
        taskIndex === index ? updatedTask : task,
      ),
    )
  }

  const deleteTask = (index) => {
    setTasks((currentTasks) =>
      currentTasks.filter((_, taskIndex) => taskIndex !== index),
    )
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true">✓</div>
        <div>
          <p className="eyebrow">YOUR DAY, IN FOCUS</p>
          <h1>Task Manager</h1>
          <p className="subtitle">A little progress adds up. What will you get done today?</p>
        </div>
      </header>

      <div className="dashboard">
        <section className="tasks-panel" aria-labelledby="tasks-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR WORKSPACE</p>
              <h2 id="tasks-heading">My tasks</h2>
            </div>
            <span className="task-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
          </div>
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks}
            today={today}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </section>

        <aside className="progress-panel" aria-label="Task progress">
          <ProgressTracker tasks={tasks} />
        </aside>
      </div>
      <footer className="app-footer">Your tasks are saved on this device.</footer>
    </main>
  )
}