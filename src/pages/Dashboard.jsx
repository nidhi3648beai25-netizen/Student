import { Link } from 'react-router-dom';
import { useMemo, useCallback} from 'react';

import ResultCard from '../components/ResultCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Timeline from '../components/Timeline.jsx';
import Notifications from '../components/Notifications.jsx';


function Dashboard({ results, setIsLoggedIn }) {
  const semesterScore = useMemo(() => {

  if (!results) {
    return 0;
  }

  const attendanceScore =
    Math.min(results.attendance, 100);

  const studyScore =
    Math.min(results.studyHours * 10, 100);

  const sleepScore =
    Math.min(results.sleepHours * 12.5, 100);

  const gpaScore =
    Math.min(results.gpa * 10, 100);


  const score =
    (
      attendanceScore +
      studyScore +
      sleepScore +
      gpaScore
    ) / 4;


  return Math.round(score);

}, [
  results
]);
const studentName =
  localStorage.getItem('studentName') || 'Student';

  const handleLogout = useCallback(() => {

  localStorage.removeItem('isLoggedIn');

  localStorage.removeItem('studentName');

  localStorage.removeItem('studentEmail');

  setIsLoggedIn(false);

}, [setIsLoggedIn]);
  return (

    <div className="dashboard-page">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          🎓 Student Life
        </div>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/simulator">
            Simulator
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

        </div>

      </nav>


      <main className="dashboard-container">
        <div className="welcome-banner">

  <div>

    <p>
      Welcome back 👋
    </p>

    <h1>
      {studentName}!
    </h1>

    <span>
      Here's how your semester is going.
    </span>

  </div>

 <div className="welcome-image-wrapper">

  <img
    src="/images/dashboard.jpeg"
    alt="Student achievement"
    className="dashboard-image"
  />

</div>

</div>



        {/* No simulation yet */}

        {!results && (

          <div className="empty-dashboard">

            <div className="empty-icon">
              🎮
            </div>

            <h1>
              Your Dashboard is Waiting!
            </h1>

            <p>
              Complete the semester simulation first
              to see your personalized dashboard.
            </p>

            <Link
              to="/simulator"
              className="dashboard-button"
            >
              Start Simulation →
            </Link>

          </div>

        )}


        {/* Dashboard */}

        {results && (

          <>

            <div className="dashboard-heading">

              <p className="tagline">
                📊 Your Semester Dashboard
              </p>

              <h1>
                Welcome to Your Semester!
              </h1>

              <div className="saved-message">
  💾 Your simulation is automatically saved.
</div>

            </div>


            {/* Student Summary */}

            <div className="student-summary">

              <div>

                <span>
                  Course
                </span>

                <strong>
                  🎓 {results.course}
                </strong>

              </div>


              <div>

                <span>
                  Study Time
                </span>

                <strong>
                  📚 {results.studyHours} hrs/day
                </strong>

              </div>


              <div>

                <span>
                  Sleep
                </span>

                <strong>
                  😴 {results.sleepHours} hrs/day
                </strong>

              </div>


              <div>

                <span>
                  Clubs
                </span>

                <strong>
                  🏫 {results.clubs.length}
                </strong>

              </div>

            </div>


            {/* Results */}

            <div className="results-grid">

              <ResultCard
                icon="🎓"
                title="GPA Estimate"
                value={results.gpa}
                description="Your predicted GPA"
                type="gpa"
              />


              <ResultCard
                icon="🧠"
                title="Stress Level"
                value={`${results.stress}%`}
                description={results.stressMessage}
                type="stress"
              />


              <ResultCard
                icon="💰"
                title="Money Left"
                value={`₹${results.moneyLeft.toLocaleString()}`}
                description="Estimated remaining money"
                type="money"
              />


              <ResultCard
                icon="🔥"
                title="Burnout Risk"
                value={results.burnoutRisk}
                description={results.burnoutMessage}
                type="burnout"
              />

            </div>

          <div className="performance-card">

  <div className="performance-header">

    <div>

      <p className="small-label">
        SEMESTER PERFORMANCE
      </p>

      <h2>
        Your Semester Score
      </h2>

      <p>
        Based on your attendance, study,
        sleep and estimated GPA.
      </p>

    </div>

    <div className="score-circle">

      <span>
        {semesterScore}
      </span>

      <small>
        /100
      </small>

    </div>

  </div>


  <div className="performance-progress">

    <div
      className="performance-progress-fill"
      style={{
        width: `${semesterScore}%`
      }}
    ></div>

  </div>


  <p className="performance-message">

    {semesterScore >= 80
      ? '🏆 Excellent semester balance!'
      : semesterScore >= 60
        ? '🎯 Good progress! Keep improving.'
        : '💪 You can improve your semester routine.'}

  </p>

<div className="completion-card">

  <div className="completion-icon">
    🏆
  </div>

  <div className="completion-content">

    <h2>
      Semester Journey
    </h2>

    <p>
      You're making progress toward completing
      your semester successfully.
    </p>

    <div className="completion-bar">

      <div
        className="completion-fill"
        style={{
          width: `${semesterScore}%`
        }}
      ></div>

    </div>

    <span>
      {semesterScore}% Semester Progress
    </span>

  </div>

</div>

</div>
            {/* Health */}

            <div className="dashboard-card">

              <h2>
                💪 Semester Health
              </h2>

              <p className="card-description">
                Keep an eye on these important areas
                throughout your semester.
              </p>


              <ProgressBar
                value={results.attendance}
                label="Attendance"
              />


              <ProgressBar
                value={results.stress}
                label="Stress Level"
              />


              <ProgressBar
                value={results.gpa * 10}
                label="Academic Performance"
              />

            </div>


            {/* Clubs */}

            <div className="dashboard-card">

              <h2>
                🏫 Your Clubs
              </h2>

              <p className="card-description">
                Activities you selected for your semester.
              </p>


              {results.clubs.length === 0 && (

                <p className="no-clubs">
                  You haven't selected any clubs.
                </p>

              )}


              {results.clubs.length > 0 && (

                <div className="selected-clubs">

                  {results.clubs.map((club) => (

                    <div
                      className="selected-club"
                      key={club}
                    >
                      ⭐ {club}
                    </div>

                  ))}

                </div>

              )}

            </div>


            {/* Attendance Message */}

            <div
              className={
                results.attendanceShortage > 0
                  ? 'dashboard-alert warning'
                  : 'dashboard-alert success'
              }
            >
              {/* Smart Notifications */}

<Notifications
  results={results}
/>


{/* Semester Timeline */}

<Timeline />

              {results.attendanceShortage > 0
                ? `⚠️ ${results.attendanceMessage}`
                : `✅ ${results.attendanceMessage}`
              }

            </div>


            {/* Actions */}

            <div className="dashboard-actions">

  <Link
    to="/simulator"
    className="secondary-button"
  >
    🔄 Change Simulation
  </Link>


  <button
    onClick={handleLogout}
    className="logout-button"
  >
    🚪 Logout
  </button>

</div>

          </>

        )}

      </main>

    </div>
  );
}

export default Dashboard;