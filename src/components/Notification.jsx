function Notification({
  icon,
  title,
  message,
  type
}) {

  return (

    <div className={`notification ${type}`}>

      <div className="notification-icon">
        {icon}
      </div>

      <div className="notification-content">

        <h3>
          {title}
        </h3>

        <p>
          {message}
        </p>

      </div>

    </div>

  );
}

export default Notification;