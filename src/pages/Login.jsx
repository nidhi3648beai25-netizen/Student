import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [error, setError] = useState('');


  const handleSubmit = (event) => {

    event.preventDefault();


    if (name.trim() === '') {

      setError('Please enter your name.');

      return;

    }


    if (email.trim() === '') {

      setError('Please enter your email.');

      return;

    }


    if (!email.includes('@')) {

      setError('Please enter a valid email address.');

      return;

    }


    // Save login information

    localStorage.setItem(
      'studentName',
      name
    );


    localStorage.setItem(
      'studentEmail',
      email
    );


    localStorage.setItem(
      'isLoggedIn',
      'true'
    );


    setIsLoggedIn(true);

    navigate('/dashboard');

  };


  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          🎓
        </div>


        <p className="tagline">
          Student Life Simulator
        </p>


        <h1>
          Welcome Back!
        </h1>


        <p className="login-description">
          Enter your details to access your
          personalized student dashboard.
        </p>


        <form
          onSubmit={handleSubmit}
          className="login-form"
        >


          <div className="form-section">

            <label>
              Your Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

          </div>


          <div className="form-section">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

          </div>


          {error && (

            <div className="login-error">
              ⚠️ {error}
            </div>

          )}


          <button
            type="submit"
            className="login-button"
          >
            🚀 Enter My Dashboard
          </button>


        </form>


        <button
          className="back-home-button"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>


      </div>

    </div>

  );
}

export default Login;