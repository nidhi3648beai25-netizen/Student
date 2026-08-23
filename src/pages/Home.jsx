import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">

      <nav className="navbar">
        <div className="logo">
          🎓 Student Life
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/simulator">Simulator</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <main className="hero">

        <div className="hero-content">

          <p className="tagline">
            ✨ Your semester. Your choices. Your story.
          </p>

          <h1>
            Simulate Your
            <span> College Life </span>
          </h1>

          <p className="hero-text">
            Wonder how your study habits, sleep, attendance and
            spending affect your semester?
          </p>

          <p className="hero-text">
            Make your choices and discover your predicted
            GPA, stress level, budget and burnout risk.
          </p>

          <Link to="/simulator" className="start-button">
            Start Simulation →
          </Link>

                  </div>

        <div className="hero-right">

          <img
            src="/images/student-hero.jpeg"
            alt="Student planning college life"
            className="hero-image"
          />

          <div className="hero-card">

            <div className="card-icon">
              🎓
            </div>

          <h2>Your Semester</h2>

          <div className="mini-stat">
            <span>📚 Study</span>
            <strong>5 hrs/day</strong>
          </div>

          <div className="mini-stat">
            <span>😴 Sleep</span>
            <strong>7 hrs/day</strong>
          </div>

          <div className="mini-stat">
            <span>📊 Attendance</span>
            <strong>82%</strong>
          </div>

          <div className="mini-stat">
            <span>💰 Budget</span>
            <strong>₹30,000</strong>
          </div>

                   <div className="score">
            <span>Semester Score</span>
            <strong>8.4 ⭐</strong>
          </div>

        </div>

        </div>

      </main>

      <section className="features">

        <h2>Everything You Need to Survive College 🎯</h2>

        <p>
          Make smart decisions and see how they shape your semester.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div>📚</div>
            <h3>Study Smarter</h3>
            <p>
              Balance your study hours and academic performance.
            </p>
          </div>

          <div className="feature-card">
            <div>💰</div>
            <h3>Manage Money</h3>
            <p>
              Track your spending and discover how much money remains.
            </p>
          </div>

          <div className="feature-card">
            <div>😴</div>
            <h3>Stay Healthy</h3>
            <p>
              Balance sleep, study and activities to reduce burnout.
            </p>
          </div>

          <div className="feature-card">
            <div>📈</div>
            <h3>See Your Results</h3>
            <p>
              Get a quick prediction of your semester performance.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;