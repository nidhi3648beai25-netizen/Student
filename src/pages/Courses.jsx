import { Link } from 'react-router-dom';

function Courses() {

  const courses = [
  {
    id: 'cse-aiml',
    name: 'CSE - AIML',
    icon: '🤖',
    image: '/images/cse-aiml.png',
    description:
      'Computer Science with Artificial Intelligence and Machine Learning.'
  },

  {
    id: 'cse',
    name: 'Computer Science',
    icon: '💻',
    image: '/images/cse.jpg',
    description:
      'Learn programming, software development and computer science fundamentals.'
  },

  {
    id: 'ece',
    name: 'Electronics & Communication',
    icon: '📡',
    image: '/images/ece.jpeg',
    description:
      'Explore electronics, communication systems and embedded technologies.'
  },

  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    icon: '⚙️',
    image: '/images/mechanical.jpeg',
    description:
      'Explore machines, manufacturing and mechanical systems.'
  }
];

  return (

    <div className="courses-page">

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

          <Link to="/courses">
            Courses
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

        </div>

      </nav>


      {/* Page */}

      <main className="courses-container">

        <div className="courses-heading">

          <p className="tagline">
            📚 Explore Courses
          </p>

          <h1>
            Choose Your Course
          </h1>

          <p>
            Explore subjects and see how they fit
            into your student journey.
          </p>

        </div>


        <div className="course-grid">

          {courses.map((course) => (

            <div className="course-card">

  <img
    src={course.image}
    alt={course.name}
    className="course-image"
  />

  <div className="course-icon">
    {course.icon}
  </div>

  <h2>
    {course.name}
  </h2>

              <p>
                {course.description}
              </p>

              <Link
                to={`/courses/${course.id}`}
                className="course-button"
              >
                Explore Course →
              </Link>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Courses;