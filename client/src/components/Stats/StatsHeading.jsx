import "./StatsHeading.css";

const StatsHeading = ({ start, end }) => {
  return (
    <h1 id="stats-heading" className="flex">
      Tasks:
      {start && (
        <span id="stats-dt-container" className="center">
          <span className="center datetime">{start}</span> -
          <span className="center datetime">{end}</span>
        </span>
      )}
    </h1>
  );
};

export default StatsHeading;
