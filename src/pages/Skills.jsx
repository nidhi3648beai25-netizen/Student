function Skills() {

  const skills = [
    'Programming',
    'Problem Solving',
    'Communication',
    'Teamwork',
    'Critical Thinking',
    'Time Management'
  ];

  return (

    <div className="nested-card">

      <h2>
        🛠️ Skills You Can Build
      </h2>

      <p>
        College is not only about marks.
        These skills can help you throughout your career.
      </p>


      <div className="skills-list">

        {skills.map((skill) => (

          <div
            className="skill-badge"
            key={skill}
          >
            ⭐ {skill}
          </div>

        ))}

      </div>

    </div>

  );
}

export default Skills;