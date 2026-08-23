function Subjects() {

  const subjects = [
    'Programming Fundamentals',
    'Data Structures',
    'Database Management Systems',
    'Operating Systems',
    'Object Oriented Programming',
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Networks'
  ];

  return (

    <div className="nested-card">

      <h2>
        📚 Important Subjects
      </h2>

      <p>
        Some subjects that students may encounter
        during their academic journey.
      </p>


      <div className="subject-list">

        {subjects.map((subject, index) => (

          <div
            className="subject-item"
            key={subject}
          >

            <span>
              {index + 1}
            </span>

            <strong>
              {subject}
            </strong>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Subjects;