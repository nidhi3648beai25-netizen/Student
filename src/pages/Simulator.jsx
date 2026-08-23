import { useRef } from 'react';
import { Link } from 'react-router-dom';

import ProgressBar from '../components/ProgressBar.jsx';
import ResultCard from '../components/ResultCard.jsx';


function Simulator({

  course,
  setCourse,

  clubs,
  handleClubChange,

  budget,
  setBudget,

  attendance,
  setAttendance,

  studyHours,
  setStudyHours,

  sleepHours,
  setSleepHours,

  runSimulation,

  results

}) {
  const resultsRef = useRef(null);
  return (

    <div className="simulator-page">

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


      {/* Main */}

      <main className="simulator-container">


        {/* Heading */}

        <div className="simulator-heading">

          <p className="tagline">
            🎮 Semester Simulator
          </p>

          <h1>
            Design Your Semester
          </h1>

          <p>
            Make your choices and discover how your college
            semester might turn out.
          </p>

        </div>
        <div className="simulator-image-container">

  <img
    src="/images/simulator.png"
    alt="Student planning semester"
    className="simulator-image"
  />

</div>

        {/* Form */}

        <form
  className="simulator-form"
  onSubmit={(event) => {

    event.preventDefault();

    runSimulation();

    setTimeout(() => {

      resultsRef.current?.scrollIntoView({
        behavior: 'smooth'
      });

    }, 100);

  }}
>


          {/* Course */}

          <div className="form-section">

            <label>
              🎓 Select Your Course
            </label>

            <select
              value={course}
              onChange={(event) =>
                setCourse(event.target.value)
              }
            >

              <option value="CSE-AIML">
                CSE - AIML
              </option>

              <option value="CSE">
                Computer Science
              </option>

              <option value="ECE">
                Electronics & Communication
              </option>

              <option value="ME">
                Mechanical Engineering
              </option>

              <option value="CE">
                Civil Engineering
              </option>

            </select>

          </div>


          {/* Clubs */}

          <div className="form-section">

            <label>
              🏫 Select Your Clubs
            </label>

            <div className="club-options">


              <label className="club-option">

                <input
                  type="checkbox"
                  checked={clubs.includes('Coding Club')}
                  onChange={() =>
                    handleClubChange('Coding Club')
                  }
                />

                💻 Coding Club

              </label>


              <label className="club-option">

                <input
                  type="checkbox"
                  checked={clubs.includes('Sports Club')}
                  onChange={() =>
                    handleClubChange('Sports Club')
                  }
                />

                ⚽ Sports Club

              </label>


              <label className="club-option">

                <input
                  type="checkbox"
                  checked={clubs.includes('Music Club')}
                  onChange={() =>
                    handleClubChange('Music Club')
                  }
                />

                🎵 Music Club

              </label>


              <label className="club-option">

                <input
                  type="checkbox"
                  checked={clubs.includes('Literary Club')}
                  onChange={() =>
                    handleClubChange('Literary Club')
                  }
                />

                📖 Literary Club

              </label>

            </div>

          </div>


          {/* Budget */}

          <div className="form-section">

            <label>
              💰 Semester Budget
            </label>

            <div className="range-container">

              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={budget}
                onChange={(event) =>
                  setBudget(
                    Number(event.target.value)
                  )
                }
              />

              <span>
                ₹{budget.toLocaleString()}
              </span>

            </div>

          </div>


          {/* Attendance */}

          <div className="form-section">

            <label>
              📊 Expected Attendance
            </label>

            <div className="range-container">

              <input
                type="range"
                min="40"
                max="100"
                value={attendance}
                onChange={(event) =>
                  setAttendance(
                    Number(event.target.value)
                  )
                }
              />

              <span>
                {attendance}%
              </span>

            </div>

          </div>


          {/* Study */}

          <div className="form-section">

            <label>
              📚 Study Hours Per Day
            </label>

            <div className="range-container">

              <input
                type="range"
                min="0"
                max="12"
                value={studyHours}
                onChange={(event) =>
                  setStudyHours(
                    Number(event.target.value)
                  )
                }
              />

              <span>
                {studyHours} hrs
              </span>

            </div>

          </div>


          {/* Sleep */}

          <div className="form-section">

            <label>
              😴 Sleep Hours Per Day
            </label>

            <div className="range-container">

              <input
                type="range"
                min="3"
                max="12"
                value={sleepHours}
                onChange={(event) =>
                  setSleepHours(
                    Number(event.target.value)
                  )
                }
              />

              <span>
                {sleepHours} hrs
              </span>

            </div>

          </div>


          {/* Button */}

          <button
            type="submit"
            className="simulate-button"
          >
            🚀 Simulate My Semester
          </button>

        </form>


        {/* Results */}

        {results && (

  <section
    ref={resultsRef}
    className="results-section"
  >


            <div className="results-heading">

              <p className="tagline">
                ✨ Your Semester Results
              </p>

              <h2>
                Here's How Your Semester Looks!
              </h2>

              <p>
                Based on your choices, here's your
                predicted semester performance.
              </p>

            </div>


            {/* Result Cards */}

            <div className="results-grid">

              <ResultCard
                icon="🎓"
                title="GPA Estimate"
                value={results.gpa}
                description="Predicted academic performance"
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
                description="Estimated remaining budget"
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


            {/* Progress */}

            <div className="progress-card">

              <h3>
                📊 Semester Health
              </h3>


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
                label="Academic Score"
              />


              {results.attendanceShortage > 0 && (

                <div className="warning-message">

                  ⚠️ Your attendance is below the
                  recommended 75%. Try attending more classes.

                </div>

              )}


              {results.attendanceShortage === 0 && (

                <div className="success-message">

                  ✅ Great! Your attendance is at or
                  above 75%.

                </div>

              )}

            </div>


            {/* Dashboard Link */}

            <Link
              to="/dashboard"
              className="dashboard-button"
            >
              📊 View My Dashboard →
            </Link>


          </section>

        )}

      </main>

    </div>
  );
}

export default Simulator;