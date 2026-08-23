import Notification from './Notification.jsx';

function Notifications({ results }) {

  const notifications = [];


  // Attendance notification

  if (results.attendance < 75) {

    notifications.push({
      icon: '⚠️',
      title: 'Attendance Alert',
      message:
        'Your attendance is below the recommended 75%. Attend more classes to avoid shortage.',
      type: 'warning'
    });

  } else if (results.attendance < 80) {

    notifications.push({
      icon: '👀',
      title: 'Attendance Reminder',
      message:
        'Your attendance is safe, but try to maintain some extra margin.',
      type: 'info'
    });

  } else {

    notifications.push({
      icon: '✅',
      title: 'Attendance Looks Great',
      message:
        'Your attendance is comfortably above the recommended level.',
      type: 'success'
    });

  }


  // Budget notification

  const budgetUsed =
    results.budget - results.moneyLeft;

  const budgetPercentage =
    (budgetUsed / results.budget) * 100;


  if (budgetPercentage >= 75) {

    notifications.push({
      icon: '💸',
      title: 'Budget Alert',
      message:
        'You have used most of your semester budget. Try controlling your expenses.',
      type: 'warning'
    });

  } else if (budgetPercentage >= 50) {

    notifications.push({
      icon: '💰',
      title: 'Budget Reminder',
      message:
        'You have used more than half of your budget. Keep an eye on your spending.',
      type: 'info'
    });

  } else {

    notifications.push({
      icon: '💵',
      title: 'Budget Looks Healthy',
      message:
        'You still have a good amount of your semester budget available.',
      type: 'success'
    });

  }


  // Sleep notification

  if (results.sleepHours < 6) {

    notifications.push({
      icon: '😴',
      title: 'Wellness Alert',
      message:
        'Your sleep schedule may increase your burnout risk. Try getting more rest.',
      type: 'warning'
    });

  } else if (results.sleepHours < 7) {

    notifications.push({
      icon: '🌙',
      title: 'Sleep Reminder',
      message:
        'Try getting at least 7 hours of sleep for better recovery.',
      type: 'info'
    });

  } else {

    notifications.push({
      icon: '💚',
      title: 'Healthy Sleep',
      message:
        'Your sleep schedule is looking healthy. Keep it up!',
      type: 'success'
    });

  }


  // Study notification

  if (results.studyHours >= 8) {

    notifications.push({
      icon: '📚',
      title: 'Study Load Alert',
      message:
        'You are studying for long hours. Remember to take breaks.',
      type: 'warning'
    });

  } else if (results.studyHours >= 5) {

    notifications.push({
      icon: '🎯',
      title: 'Good Study Routine',
      message:
        'Your study hours look balanced. Keep following your routine.',
      type: 'success'
    });

  } else {

    notifications.push({
      icon: '📖',
      title: 'Study Reminder',
      message:
        'Consider increasing your study time to improve your GPA.',
      type: 'info'
    });

  }


  return (

    <div className="dashboard-card">

      <h2>
        🔔 Smart Notifications
      </h2>

      <p className="card-description">
        Personalized alerts based on your semester choices.
      </p>


      <div className="notifications-list">

        {notifications.map((notification, index) => (

          <Notification
            key={index}
            icon={notification.icon}
            title={notification.title}
            message={notification.message}
            type={notification.type}
          />

        ))}

      </div>

    </div>

  );
}

export default Notifications;