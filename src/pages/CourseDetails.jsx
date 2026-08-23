import { Link, Outlet, useParams } from 'react-router-dom';


function CourseDetails() {

  const { courseId } = useParams();


  const courseData = {

    'cse-aiml': {
      name: 'CSE - AIML',
      icon: '🤖',
      description:
        'Computer Science with Artificial Intelligence and Machine Learning.'
    },

    'cse': {
      name: 'Computer Science',
      icon: '💻',
      description:
        'A program focused on programming, algorithms and software development.'
    },

    'ece': {
      name: 'Electronics & Communication',
      icon: '📡',
      description:
        'A program focused on electronics and communication technologies.'
    },

    'mechanical': {
      name: 'Mechanical Engineering',
      icon: '⚙️',
      description:
        'A program focused on machines, manufacturing and mechanical systems.'
    }

  };


  const course = courseData[courseId];


  if (!course) {

    return (

      <div className="not-found-simple">

        <h1>
          Course Not Found
        </h1>

        <p>
          The course you are looking for does not exist.
        </p>

        <Link to="/courses">
          ← Back to Courses
        </Link>

      </div>

    );

  }


  return (

    <div className="course-details-page">

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


      <main className="course-details-container">

        {/* Course Header */}

        <div className="course-header">

          <div className="large-course-icon">
            {course.icon}
          </div>

          <div>

            <p className="tagline">
              📚 Course Details
            </p>

            <h1>
              {course.name}
            </h1>

            <p>
              {course.description}
            </p>

          </div>

        </div>


        {/* Nested Navigation */}

        <div className="course-tabs">

          <Link to="">
            Overview
          </Link>

          <Link to="subjects">
            Subjects
          </Link>

          <Link to="skills">
            Skills
          </Link>

        </div>


        {/* Nested Route Content */}

        <div className="nested-content">

          <Outlet />

        </div>


        <Link
          to="/courses"
          className="back-link"
        >
          ← Back to Courses
        </Link>

      </main>

    </div>

  );
}

export default CourseDetails;