export default function ProgressTracker({ tasks }) {
  const completedTasks = tasks.filter((task) => task.complete).length
  const progress = tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100)

  return (
    <div className="progress-card">
      <div className="progress-icon" aria-hidden="true">↗</div>
      <p className="eyebrow">KEEP IT UP</p>
      <h2>Your progress</h2>
      <p className="progress-message">
        {tasks.length === 0
          ? 'Your next small win is waiting.'
          : completedTasks === tasks.length
            ? 'Everything is done. Nice work!'
            : `${completedTasks} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} complete`}
      </p>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Tasks completed"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-percent">{progress}% <span>completed</span></p>
    </div>
  )
}