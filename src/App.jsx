
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

import ProtectedRoute from './components/ProtectedRoute.jsx';
import useLocalStorage from './hooks/useLocalStorage.js';

import { StudentContext } from './StudentContext.jsx';

function App() {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Student input state
  const [course, setCourse] = useState('CSE-AIML');
  const [clubs, setClubs] = useState([]);
  const [budget, setBudget] = useState(30000);
  const [attendance, setAttendance] = useState(75);
  const [studyHours, setStudyHours] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);

  // Save simulation results in localStorage
  const [results, setResults] = useLocalStorage(
    'studentLifeResults',
    null
  );

  // Add or remove clubs
  const handleClubChange = (club) => {
    if (clubs.includes(club)) {
      setClubs(clubs.filter((item) => item !== club));
    } else {
      setClubs([...clubs, club]);
    }
  };

  // Run student life simulation
  const runSimulation = () => {
    // Calculate GPA
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

    // Calculate stress
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

    stress = Math.min(100, Math.max(0, Math.round(stress)));

    // Calculate attendance shortage
    const attendanceShortage =
      attendance < 75 ? 75 - attendance : 0;

    // Calculate remaining money
    const basicExpenses = budget * 0.45;
    const clubExpenses = clubs.length * 1200;

    let moneyLeft = budget - basicExpenses - clubExpenses;
    moneyLeft = Math.max(0, Math.round(moneyLeft));

    // Calculate burnout risk
    let burnoutRisk = 'Low';

    if (stress >= 70 || sleepHours <= 5) {
      burnoutRisk = 'High';
    } else if (stress >= 50 || sleepHours <= 6) {
      burnoutRisk = 'Medium';
    }

    // Burnout message
    let burnoutMessage = 'Your semester looks balanced!';

    if (burnoutRisk === 'Medium') {
      burnoutMessage = 'Try balancing your study and rest.';
    }

    if (burnoutRisk === 'High') {
      burnoutMessage =
        'You need more rest and better time management.';
    }

    // Stress message
    let stressMessage = 'Your stress level is manageable.';

    if (stress >= 70) {
      stressMessage = 'Your stress level is quite high!';
    } else if (stress >= 50) {
      stressMessage = 'Keep an eye on your stress level.';
    }

    // Attendance message
    let attendanceMessage = 'Your attendance is safe.';

    if (attendanceShortage > 0) {
      attendanceMessage =
        `You are ${attendanceShortage}% below the recommended attendance.`;
    }

    // Store the results
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

  return (
    <StudentContext.Provider value={{ results, setResults }}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
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
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }
        />

        <Route path="/courses" element={<Courses />} />

        <Route
          path="/courses/:courseId"
          element={<CourseDetails />}
        >
          <Route index element={<CourseOverview />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="skills" element={<Skills />} />
        </Route>

        <Route path="/planner" element={<SemesterPlanner />} />
        <Route path="/study-goals" element={<StudyGoals />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </StudentContext.Provider>
  );
}

export default App;
