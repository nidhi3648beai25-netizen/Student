function ResultCard({ icon, title, value, description, type }) {
  return (
    <div className={`result-card ${type}`}>

      <div className="result-icon">
        {icon}
      </div>

      <div className="result-content">

        <p>{title}</p>

        <h2>{value}</h2>

        <span>
          {description}
        </span>

      </div>

    </div>
  );
}

export default ResultCard;