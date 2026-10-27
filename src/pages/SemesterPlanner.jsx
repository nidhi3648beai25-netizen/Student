
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <article className={`planner-task-card ${task.completed ? 'task-completed' : ''}`}>
      <section className="planner-task-top">
        <span className="planner-task-type">{task.type}</span>
        <span className="planner-task-date">{task.date}</span>
      </section>

      <h3>{task.title}</h3>

      <p>{task.completed ? 'Completed 🎉' : 'Still to do'}</p>

      <footer className="planner-task-actions">
        <button
          type="button"
          className="planner-complete-button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Undo' : 'Mark complete'}
        </button>

        <button
          type="button"
          className="planner-delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </footer>
    </article>
  );
}

function SemesterPlanner() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Assignment');
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('All');

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('semesterTasks')) || [];
    } catch {
      return [];
    }
  });

  // Save tasks whenever the list changes
  
useEffect(() => {
  localStorage.setItem(
    'semesterTasks',
    JSON.stringify(tasks)
  );

  // Notify other parts of the app that data changed
  window.dispatchEvent(new Event('studentDataUpdated'));
}, [tasks]);


  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !date) return;

    const newTask = {
      id: `${Date.now()}-${Math.random()}`,
      title: title.trim(),
      type,
      date,
      completed: false
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setTitle('');
    setType('Assignment');
    setDate('');
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  const visibleTasks = tasks
    .filter((task) => {
      if (filter === 'Pending') return !task.completed;
      if (filter === 'Completed') return task.completed;
      return true;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <main className="dark-dashboard planner-page">
      <nav className="dark-navbar">
        <Link to="/" className="dark-brand">
          🎓 Student Life
        </Link>

        <section className="dark-nav-links" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/simulator">Simulator</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/study-goals">Study Goals</Link>
          <Link to="/planner" className="active">Planner</Link>
        </section>
      </nav>

      <section className="dark-dashboard-container">
        <header className="planner-heading">
          <p className="dark-eyebrow">PLAN • TRACK • ACHIEVE</p>
          <h1>Semester Planner <span>✦</span></h1>
          <p>Keep assignments, exams, and study tasks in one place.</p>
        </header>

        <section className="planner-stats">
          <article className="planner-stat-card">
            <span>📋</span>
            <p>Total Tasks</p>
            <strong>{tasks.length}</strong>
          </article>

          <article className="planner-stat-card">
            <span>⏳</span>
            <p>Pending</p>
            <strong>{pendingCount}</strong>
          </article>

          <article className="planner-stat-card">
            <span>✅</span>
            <p>Completed</p>
            <strong>{completedCount}</strong>
          </article>
        </section>

        <section className="dark-section-card">
          <header className="dark-section-header">
            <h2>＋ Add a New Task</h2>
            <p>Create a reminder for your semester.</p>
          </header>

          <form className="planner-form" onSubmit={handleSubmit}>
            <label>
              Task name
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Complete React assignment"
                required
                maxLength={100}
              />
            </label>

            <label>
              Task type
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option>Assignment</option>
                <option>Exam</option>
                <option>Study Session</option>
                <option>Project</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Due date
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>

            <button type="submit" className="dark-primary-button">
              Add Task +
            </button>
          </form>
        </section>

        <section className="dark-section-card">
          <header className="planner-list-heading">
            <section className="dark-section-header">
              <h2>Your Tasks</h2>
              <p>Stay on top of your deadlines.</p>
            </section>

            <label className="planner-filter">
              Filter
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </label>
          </header>

          {visibleTasks.length === 0 ? (
            <section className="planner-empty">
              <span>🌱</span>
              <h3>No tasks here yet</h3>
              <p>Add a task above and start planning your semester.</p>
            </section>
          ) : (
            <section className="planner-task-grid">
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </section>
          )}
        </section>

        <footer className="planner-footer">
          <Link to="/dashboard" className="dark-primary-button">
            ← Back to Dashboard
          </Link>
        </footer>
      </section>
    </main>
  );
}

export default SemesterPlanner;
