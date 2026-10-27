import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Simulator from './pages/Simulator.jsx';
import Dashboard from './pages/Dashboard.jsx';

import StudyGoals from './pages/StudyGoals.jsx';

import Courses from './pages/Courses.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import CourseOverview from './pages/CourseOverview.jsx';
import Subjects from './pages/Subjects.jsx';
import Skills from './pages/Skills.jsx';
import SemesterPlanner from './pages/SemesterPlanner.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

import useLocalStorage from './hooks/useLocalStorage.js';

function App() {

  // =========================
  // STUDENT INPUT STATE
  // =========================

  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem('isLoggedIn') === 'true'
);

  const [course, setCourse] = useState('CSE-AIML');
  const [clubs, setClubs] = useState([]);
  const [budget, setBudget] = useState(30000);
  const [attendance, setAttendance] = useState(75);
  const [studyHours, setStudyHours] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);

  // =========================
  // SIMULATION RESULT STATE
  // =========================

  const [results, setResults] =
  useLocalStorage(
    'studentLifeResults',
    null
  );


  // =========================
  // CLUB SELECTION
  // =========================

  const handleClubChange = (club) => {

    if (clubs.includes(club)) {

      setClubs(
        clubs.filter((item) => item !== club)
      );

    } else {

      setClubs(
        [...clubs, club]
      );

    }
  };


  // =========================
  // SIMULATION
  // =========================

  const runSimulation = () => {

    // GPA

    let gpa = 5;

    gpa += studyHours * 0.4;

    if (attendance >= 75) {
      gpa += 0.5;
    }

    if (sleepHours >= 7) {
      gpa += 0.5;
    }

    if (clubs.length > 0) {
      gpa += 0.2;
    }

    if (clubs.length >= 3) {
      gpa -= 0.2;
    }

    gpa = Math.min(10, Math.max(4, gpa));

    gpa = Number(gpa.toFixed(1));


    // Stress

    let stress = 45;

    if (studyHours > 7) {
      stress += (studyHours - 7) * 6;
    }

    if (studyHours < 4) {
      stress += (4 - studyHours) * 3;
    }

    if (sleepHours < 7) {
      stress += (7 - sleepHours) * 8;
    }

    if (attendance < 75) {
      stress += (75 - attendance) * 0.5;
    }

    stress += clubs.length * 3;

    stress = Math.min(
      100,
      Math.max(0, Math.round(stress))
    );


    // Attendance shortage

    const attendanceShortage =
      attendance < 75
        ? 75 - attendance
        : 0;


    // Money left

    const basicExpenses = budget * 0.45;

    const clubExpenses = clubs.length * 1200;

    let moneyLeft =
      budget - basicExpenses - clubExpenses;

    moneyLeft = Math.max(
      0,
      Math.round(moneyLeft)
    );


    // Burnout

    let burnoutRisk = 'Low';

    if (stress >= 70 || sleepHours <= 5) {

      burnoutRisk = 'High';

    } else if (
      stress >= 50 ||
      sleepHours <= 6
    ) {

      burnoutRisk = 'Medium';

    }


    // Messages

    let burnoutMessage =
      'Your semester looks balanced!';

    if (burnoutRisk === 'Medium') {

      burnoutMessage =
        'Try balancing your study and rest.';

    }

    if (burnoutRisk === 'High') {

      burnoutMessage =
        'You need more rest and better time management.';

    }


    let stressMessage =
      'Your stress level is manageable.';

    if (stress >= 70) {

      stressMessage =
        'Your stress level is quite high!';

    } else if (stress >= 50) {

      stressMessage =
        'Keep an eye on your stress level.';

    }


    let attendanceMessage =
      'Your attendance is safe.';

    if (attendanceShortage > 0) {

      attendanceMessage =
        `You are ${attendanceShortage}% below the recommended attendance.`;

    }


    // Save results

    setResults({

      course,
      clubs,
      budget,
      attendance,
      studyHours,
      sleepHours,

      gpa,
      stress,
      attendanceShortage,
      moneyLeft,

      burnoutRisk,

      burnoutMessage,
      stressMessage,
      attendanceMessage

    });
  };


  // =========================
  // ROUTES
  // =========================

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
  path="/login"
  element={
    <Login
      setIsLoggedIn={setIsLoggedIn}
    />
  }
/>

      <Route
        path="/simulator"
        element={
          <Simulator
            course={course}
            setCourse={setCourse}

            clubs={clubs}
            handleClubChange={handleClubChange}

            budget={budget}
            setBudget={setBudget}

            attendance={attendance}
            setAttendance={setAttendance}

            studyHours={studyHours}
            setStudyHours={setStudyHours}

            sleepHours={sleepHours}
            setSleepHours={setSleepHours}

            runSimulation={runSimulation}
            results={results}
          />
        }
      />

      <Route
  path="/dashboard"
  element={

    <ProtectedRoute
      isLoggedIn={isLoggedIn}
    >

      <Dashboard
  results={results}
  setIsLoggedIn={setIsLoggedIn}
/>

    </ProtectedRoute>

  }
/>
        {/* Courses */}

<Route
  path="/courses"
  element={<Courses />}
/>


{/* Dynamic Course Route */}

<Route
  path="/courses/:courseId"
  element={<CourseDetails />}
>

  {/* Nested Routes */}

  <Route
    index
    element={<CourseOverview />}
  />

  <Route
    path="subjects"
    element={<Subjects />}
  />

  <Route
    path="skills"
    element={<Skills />}
  />

</Route>

     <Route
  path="*"
  element={
    <Navigate
      to="/"
      replace
    />
  }
/>
<Route
  path="/planner"
  element={<SemesterPlanner />}
/>


<Route
  path="/study-goals"
  element={<StudyGoals />}
/>

    </Routes>
  );
}

export default App;