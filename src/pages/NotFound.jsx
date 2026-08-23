import { Link } from 'react-router-dom';


function NotFound() {

  return (

    <div className="not-found-page">

      <div className="not-found-card">

        <div className="not-found-number">
          404
        </div>


        <img
  src="/images/404.avif"
  alt="Page not found"
  className="not-found-image"
/>

        <h1>
          Oops! Page Not Found
        </h1>


        <p>
          Looks like you took a wrong turn.
          The page you're looking for doesn't exist.
        </p>


        <div className="not-found-actions">

          <Link
            to="/"
            className="dashboard-button"
          >
            🏠 Go Home
          </Link>


          <Link
            to="/simulator"
            className="secondary-button"
          >
            🎮 Open Simulator
          </Link>

        </div>

      </div>

    </div>

  );
}

export default NotFound;