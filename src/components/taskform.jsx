import { useState } from 'react'

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [category, setCategory] = useState('General')
  const [deadline, setDeadline] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const taskName = task.trim()
    if (!taskName) return

    addTask({
      task: taskName,
      priority,
      category,
      deadline,
      complete: false,
    })

    setTask('')
    setPriority('Medium')
    setCategory('General')
    setDeadline('')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div id="inp">
        <input
          type="text"
          placeholder="Enter Your Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <span>
          <button type="submit">Add Task</button>
        </span>
        
      </div>

      <div id="btns">
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Work">Work</option>
          <option value="General">General</option>
          <option value="Personal">Personal</option>
        </select>
        <label className="deadline-field">
          <span>Deadline</span>
          <input
            type="date"
            aria-label="Task deadline"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />
        </label>
      </div>
    </form>
  )
}