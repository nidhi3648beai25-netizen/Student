function Timeline() {

  const events = [
    {
      week: 'Week 1',
      title: 'Orientation',
      icon: '🎓',
      description: 'Start your semester and get familiar with your subjects.'
    },
    {
      week: 'Week 3',
      title: 'First Assignments',
      icon: '📚',
      description: 'Assignments and regular classes begin.'
    },
    {
      week: 'Week 6',
      title: 'Midterm Preparation',
      icon: '📝',
      description: 'Start preparing for your first major exams.'
    },
    {
      week: 'Week 10',
      title: 'Project Phase',
      icon: '🚀',
      description: 'Work on projects and practical assignments.'
    },
    {
      week: 'Week 14',
      title: 'Final Exam Preparation',
      icon: '🔥',
      description: 'Time to revise and prepare for final examinations.'
    },
    {
      week: 'Week 16',
      title: 'Semester Complete',
      icon: '🏆',
      description: 'Congratulations! You completed your semester.'
    }
  ];

  return (

    <div className="dashboard-card timeline-card">

      <h2>
        🎯 Semester Journey
      </h2>

      <p className="card-description">
        A quick look at the important milestones
        throughout your semester.
      </p>


      <div className="timeline">

        {events.map((event, index) => (

          <div
            className="timeline-item"
            key={event.week}
          >

            <div className="timeline-line">

              <div className="timeline-dot">
                {event.icon}
              </div>

              {index !== events.length - 1 && (
                <div className="timeline-connector"></div>
              )}

            </div>


            <div className="timeline-content">

              <span className="timeline-week">
                {event.week}
              </span>

              <h3>
                {event.title}
              </h3>

              <p>
                {event.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Timeline;