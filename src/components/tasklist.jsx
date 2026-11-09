const formatDeadline = (deadline) =>
  new Date(`${deadline}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export default function TaskList({ tasks, today, updateTask, deleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✦</span>
        <h3>No tasks yet</h3>
        <p>Add your first task above and make today count.</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li className={`task-item${task.complete ? ' is-complete' : ''}`} key={`${task.task}-${index}`}>
          <button
            className="complete-button"
            type="button"
            aria-label={task.complete ? `Mark ${task.task} as incomplete` : `Complete ${task.task}`}
            aria-pressed={Boolean(task.complete)}
            onClick={() => updateTask({ ...task, complete: !task.complete }, index)}
          >
            {task.complete ? '✓' : ''}
          </button>
          <div className="task-details">
            <span className="task-name">{task.task}</span>
            <div className="task-tags">
              <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className="category-tag">{task.category}</span>
              {task.deadline && (
                <span
                  className={`deadline-tag${!task.complete && task.deadline < today ? ' is-overdue' : ''}`}
                >
                  {task.deadline < today && !task.complete ? 'Overdue · ' : 'Due '}
                  {formatDeadline(task.deadline)}
                </span>
              )}
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            aria-label={`Delete ${task.task}`}
            onClick={() => deleteTask(index)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
