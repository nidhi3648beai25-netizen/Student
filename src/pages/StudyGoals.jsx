
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StudyGoals() {
  // Load saved data when the page opens
  const [goal, setGoal] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('studyGoals'));
      return saved?.goal ?? 15;
    } catch {
      return 15;
    }
  });

  const [completed, setCompleted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('studyGoals'));
      return saved?.completed ?? 0;
    } catch {
      return 0;
    }
  });

  // Save the goal and completed hours automatically
  
useEffect(() => {
  localStorage.setItem(
    'studyGoals',
    JSON.stringify({ goal, completed })
  );

  // Notify other parts of the app that data changed
  window.dispatchEvent(new Event('studentDataUpdated'));
}, [goal, completed]);


  // Calculate progress percentage
  const percentage =
    goal > 0
      ? Math.min(100, Math.round((completed / goal) * 100))
      : 0;

  // Update the weekly goal
  function handleGoalChange(event) {
    const value = Math.max(1, Number(event.target.value) || 1);
    setGoal(value);
  }

  // Update completed study hours
  function handleCompletedChange(event) {
    const value = Math.max(0, Number(event.target.value) || 0);
    setCompleted(value);
  }

  // Add one completed study hour
  function addHour() {
    setCompleted(previous => previous + 1);
  }

  // Reset completed hours
  function resetProgress() {
    setCompleted(0);
  }

  return (
    <div className="study-goals-page">
      <nav className="study-goals-nav">
        <Link to="/" className="study-goals-brand">
          Student Life Simulator
        </Link>

        <div className="study-goals-links">
          <Link to="/">Home</Link>
          <Link to="/simulator">Simulator</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/study-goals">Study Goals</Link>
          <Link to="/planner">Planner</Link>
        </div>
      </nav>

      <main className="study-goals-container">
        <section className="study-goals-heading">
          <p className="study-goals-tag">YOUR ACADEMIC JOURNEY</p>
          <h1>Study Goals Tracker</h1>
          <p>
            Set a weekly study target, track your progress,
            and build a consistent study routine.
          </p>
        </section>

        <section className="study-goals-grid">
          <article className="study-goals-card">
            <div className="study-goals-icon">🎯</div>
            <h2>Weekly Study Goal</h2>
            <p>How many hours do you want to study each week?</p>

            <label htmlFor="weeklyGoal">Target hours</label>
            <input
              id="weeklyGoal"
              type="number"
              min="1"
              value={goal}
              onChange={handleGoalChange}
            />

            <label htmlFor="completedHours">Completed hours</label>
            <input
              id="completedHours"
              type="number"
              min="0"
              value={completed}
              onChange={handleCompletedChange}
            />

            <button
              type="button"
              className="study-goals-primary"
              onClick={addHour}
            >
              + Add 1 Study Hour
            </button>

            <button
              type="button"
              className="study-goals-secondary"
              onClick={resetProgress}
            >
              Reset Progress
            </button>
          </article>

          <article className="study-goals-card study-goals-progress-card">
            <div className="study-goals-icon">📈</div>
            <h2>Your Weekly Progress</h2>

            <div className="study-goals-percentage">
              {percentage}%
            </div>

            <div
              className="study-goals-progress-track"
              role="progressbar"
              aria-label="Weekly study goal progress"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="study-goals-progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="study-goals-hours">
              {completed} of {goal} hours completed
            </p>

            <div className="study-goals-stat-row">
              <div>
                <span>Completed</span>
                <strong>{completed} hrs</strong>
              </div>

              <div>
                <span>Goal</span>
                <strong>{goal} hrs</strong>
              </div>
            </div>

            <div className="study-goals-message">
              {percentage >= 100
                ? 'Amazing! You have achieved your weekly goal! 🎉'
                : percentage >= 50
                ? 'Great progress! Keep going. 💪'
                : 'Every study hour counts. You can do it! 🌱'}
            </div>
          </article>
        </section>

        <section className="study-goals-tip">
          <span>💡</span>
          <div>
            <h3>Study tip</h3>
            <p>
              Break your study time into small sessions and take
              short breaks to stay focused.
            </p>
          </div>
        </section>

        <div className="study-goals-back">
          <Link to="/simulator">← Back to Simulator</Link>
        </div>
      </main>
    </div>
  );
}

export default StudyGoals;
