
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import ResultCard from '../components/ResultCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Timeline from '../components/Timeline.jsx';
import Notifications from '../components/Notifications.jsx';

import { useStudentContext } from '../StudentContext.jsx';

// Reusable summary card
function SummaryCard({ icon, title, value, description }) {
  return (
    <article className="dark-summary-card">
      <span className="dark-card-icon" aria-hidden="true">
        {icon}
      </span>
      <p>{title}</p>
      <h3>{value}</h3>
      <small>{description}</small>
    </article>
  );
}

// Reusable section card
function SectionCard({ title, subtitle, children }) {
  return (
    <section className="dark-section-card">
      <header className="dark-section-header">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

function getStudyGoals() {
  try {
    const saved = JSON.parse(localStorage.getItem('studyGoals'));

    return {
      goal: Number(saved?.goal) || 15,
      completed: Math.max(0, Number(saved?.completed) || 0)
    };
  } catch {
    return { goal: 15, completed: 0 };
  }
}

function getSemesterTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem('semesterTasks'));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Dashboard({ setIsLoggedIn }) {
  // Read simulation results from Context API
  const { results } = useStudentContext();

  const [advice, setAdvice] = useState('');
  const [adviceLoading, setAdviceLoading] = useState(true);
  const [adviceError, setAdviceError] = useState(false);
  const [refreshAdvice, setRefreshAdvice] = useState(0);

  const [studyGoals, setStudyGoals] = useState(getStudyGoals);
  const [semesterTasks, setSemesterTasks] = useState(getSemesterTasks);

  useEffect(() => {
    function refreshStudentData() {
      setStudyGoals(getStudyGoals());
      setSemesterTasks(getSemesterTasks());
    }

    window.addEventListener('studentDataUpdated', refreshStudentData);
    window.addEventListener('storage', refreshStudentData);

    refreshStudentData();

    return () => {
      window.removeEventListener('studentDataUpdated', refreshStudentData);
      window.removeEventListener('storage', refreshStudentData);
    };
  }, []);

  const goalPercentage = studyGoals.goal > 0
    ? Math.min(
        100,
        Math.round((studyGoals.completed / studyGoals.goal) * 100)
      )
    : 0;

  const completedTasks = semesterTasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = semesterTasks.filter(
    (task) => !task.completed
  ).length;

  const studentName = localStorage.getItem('studentName') || 'Student';

  // Calculate a score using Context API simulation results
  const semesterScore = useMemo(() => {
    if (!results) return 0;

    const attendanceScore = Math.min(
      Number(results.attendance) || 0,
      100
    );

    const studyScore = Math.min(
      (Number(results.studyHours) || 0) * 10,
      100
    );

    const sleepScore = Math.min(
      (Number(results.sleepHours) || 0) * 12.5,
      100
    );

    const gpaScore = Math.min(
      (Number(results.gpa) || 0) * 10,
      100
    );

    return Math.round(
      (attendanceScore + studyScore + sleepScore + gpaScore) / 4
    );
  }, [results]);

  // REST API: fetch motivational advice from Advice Slip
  useEffect(() => {
    let isActive = true;

    async function fetchAdvice() {
      setAdviceLoading(true);
      setAdviceError(false);

      try {
        const response = await fetch(
          'https://api.adviceslip.com/advice',
          { cache: 'no-store' }
        );

        if (!response.ok) {
          throw new Error('Could not load advice');
        }

        const data = await response.json();

        if (isActive && data.slip && data.slip.advice) {
          setAdvice(data.slip.advice);
        } else if (isActive) {
          throw new Error('Advice was not available');
        }
      } catch {
        if (isActive) {
          setAdviceError(true);
        }
      } finally {
        if (isActive) {
          setAdviceLoading(false);
        }
      }
    }

    fetchAdvice();

    return () => {
      isActive = false;
    };
  }, [refreshAdvice]);

  // Log out the current student
  const handleLogout = useCallback(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentEmail');

    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  const clubs = results?.clubs || [];

  return (
    <main className="dark-dashboard">
      {/* Navigation */}
      <nav className="dark-navbar">
        <Link to="/" className="dark-brand">
          <span>🎓</span> Student Life
        </Link>

        <section className="dark-nav-links" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/simulator">Simulator</Link>
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/study-goals">Study Goals</Link>
          <Link to="/planner">Semester Planner</Link>
        </section>
      </nav>

      <section className="dark-dashboard-container">
        {/* Welcome section */}
        <header className="dark-welcome">
          <section>
            <p className="dark-eyebrow">YOUR PERSONAL SPACE</p>
            <h1>
              Welcome back, <span>{studentName}</span>!
            </h1>
            <p className="dark-welcome-text">
              Small steps today, big achievements tomorrow.
            </p>
          </section>

          <img
            src="/images/dashboard.jpeg"
            alt="Student achievement"
            className="dark-dashboard-image"
          />
        </header>

        {/* REST API motivational tip */}
        <SectionCard
          title="✨ Daily Motivation"
          subtitle="A little inspiration for your student journey"
        >
          {adviceLoading ? (
            <p className="dark-api-message" role="status">
              Loading your motivational tip...
            </p>
          ) : adviceError ? (
            <section className="dark-api-message">
              <p>
                Unable to load a tip right now. Check your internet
                connection and try again.
              </p>

              <button
                className="dark-small-button"
                onClick={() => setRefreshAdvice((count) => count + 1)}
              >
                Try again
              </button>
            </section>
          ) : (
            <section className="dark-advice-content">
              <p>“{advice}”</p>

              <button
                className="dark-small-button"
                onClick={() => setRefreshAdvice((count) => count + 1)}
              >
                Get another tip ↻
              </button>
            </section>
          )}
        </SectionCard>

        {/* Show this when no simulation has been completed */}
        {!results ? (
          <section className="dark-empty-card">
            <span className="dark-empty-icon">🚀</span>
            <h2>Your dashboard is waiting!</h2>
            <p>
              Complete your student life simulation to see your
              estimated GPA, stress level, budget, and progress.
            </p>

            <Link to="/simulator" className="dark-primary-button">
              Start Simulation →
            </Link>
          </section>
        ) : (
          <>
            <header className="dark-page-heading">
              <section>
                <p className="dark-eyebrow">SEMESTER OVERVIEW</p>
                <h2>Your Semester Dashboard</h2>
              </section>

              <p className="dark-saved-label">
                <span aria-hidden="true">●</span> Simulation results loaded
              </p>
            </header>

            {/* Summary cards */}
            <section className="dark-summary-grid" aria-label="Student summary">
              <SummaryCard
                icon="🎓"
                title="Course"
                value={results.course || 'Not selected'}
                description="Your selected course"
              />

              <SummaryCard
                icon="📚"
                title="Study Time"
                value={`${results.studyHours ?? 0} hrs`}
                description="Study hours per day"
              />

              <SummaryCard
                icon="🌙"
                title="Sleep"
                value={`${results.sleepHours ?? 0} hrs`}
                description="Sleep hours per day"
              />

              <SummaryCard
                icon="🏆"
                title="Clubs"
                value={clubs.length}
                description="Activities selected"
              />
            </section>

            {/* Simulation result cards */}
            <SectionCard
              title="Your Results"
              subtitle="Your predicted semester outcomes"
            >
              <section className="dark-results-grid">
                <ResultCard
                  icon="🎓"
                  title="GPA Estimate"
                  value={results.gpa ?? 'N/A'}
                  description="Your predicted GPA"
                  type="gpa"
                />

                <ResultCard
                  icon="🧠"
                  title="Stress Level"
                  value={`${results.stress ?? 0}%`}
                  description={results.stressMessage || 'Estimated stress'}
                  type="stress"
                />

                <ResultCard
                  icon="💰"
                  title="Money Left"
                  value={`₹${(Number(results.moneyLeft) || 0).toLocaleString('en-IN')}`}
                  description="Estimated remaining money"
                  type="money"
                />

                <ResultCard
                  icon="🔥"
                  title="Burnout Risk"
                  value={results.burnoutRisk || 'Unknown'}
                  description={results.burnoutMessage || 'Keep a healthy balance'}
                  type="burnout"
                />
              </section>
            </SectionCard>

            {/* Semester performance */}
            <SectionCard
              title="⚡ Semester Performance"
              subtitle="A combined score based on attendance, study, sleep, and GPA"
            >
              <section className="dark-performance">
                <section className="dark-score-circle">
                  <strong>{semesterScore}</strong>
                  <span>OUT OF 100</span>
                </section>

                <section className="dark-performance-details">
                  <h3>
                    {semesterScore >= 80
                      ? '🏆 Excellent balance!'
                      : semesterScore >= 60
                        ? '🎯 Good progress!'
                        : '💪 Room to improve!'}
                  </h3>

                  <p>
                    Keep working towards a healthier and more balanced
                    semester routine.
                  </p>

                  <section
                    className="dark-progress-track"
                    role="progressbar"
                    aria-label="Semester performance"
                    aria-valuenow={semesterScore}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span style={{ width: `${semesterScore}%` }} />
                  </section>

                  <p className="dark-progress-caption">
                    {semesterScore}% performance score
                  </p>
                </section>
              </section>
            </SectionCard>

            {/* Health progress */}
            <SectionCard
              title="💚 Semester Health"
              subtitle="Keep an eye on your academic and personal well-being"
            >
              <ProgressBar
                value={Number(results.attendance) || 0}
                label="Attendance"
              />

              <ProgressBar
                value={Number(results.stress) || 0}
                label="Stress Level"
              />

              <ProgressBar
                value={(Number(results.gpa) || 0) * 10}
                label="Academic Performance"
              />
            </SectionCard>

            {/* Clubs */}
            <SectionCard
              title="🌟 Your Clubs"
              subtitle="Activities you selected for this semester"
            >
              {clubs.length === 0 ? (
                <p className="dark-muted">
                  You haven't selected any clubs yet.
                </p>
              ) : (
                <ul className="dark-club-list">
                  {clubs.map((club) => (
                    <li key={club} className="dark-club-item">
                      ⭐ {club}
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>

            {/* Attendance alert */}
            <section
              className={`dark-attendance-alert ${
                Number(results.attendanceShortage) > 0
                  ? 'warning'
                  : 'success'
              }`}
            >
              <h3>
                {Number(results.attendanceShortage) > 0
                  ? '⚠️ Attendance Alert'
                  : '✅ Attendance Status'}
              </h3>

              <p>
                {results.attendanceMessage ||
                  'Keep checking your attendance regularly.'}
              </p>
            </section>

            {/* Smart notifications */}
            <SectionCard
              title="🔔 Smart Notifications"
              subtitle="Helpful reminders based on your simulation"
            >
              <Notifications results={results} />
            </SectionCard>

            {/* Semester timeline */}
            <SectionCard
              title="🗓️ Semester Journey"
              subtitle="Your semester milestones"
            >
              <Timeline />
            </SectionCard>

            {/* Study goals and tasks summary */}
            <SectionCard
              title="🎯 Study Goals Overview"
              subtitle="Your saved study goals and semester tasks"
            >
              <p>
                Weekly study goal: <strong>{studyGoals.goal} hours</strong>
              </p>

              <p>
                Completed study hours: <strong>{studyGoals.completed}</strong>
              </p>

              <ProgressBar
                value={goalPercentage}
                label="Study goal completion"
              />

              <p>
                Completed semester tasks: <strong>{completedTasks}</strong>
              </p>

              <p>
                Pending semester tasks: <strong>{pendingTasks}</strong>
              </p>

              <Link to="/study-goals" className="dark-primary-button">
                View Study Goals →
              </Link>
            </SectionCard>

            {/* Actions */}
            <footer className="dark-dashboard-actions">
              <Link to="/simulator" className="dark-primary-button">
                ↻ Change Simulation
              </Link>

              <button
                onClick={handleLogout}
                className="dark-logout-button"
              >
                Log Out
              </button>
            </footer>
          </>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
