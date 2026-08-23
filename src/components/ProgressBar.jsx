function ProgressBar({ value, label }) {
  return (
    <div className="progress-wrapper">

      <div className="progress-info">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="progress-background">
        <div
          className="progress-fill"
          style={{ width: `${value}%` }}
        ></div>
      </div>

    </div>
  );
}

export default ProgressBar;