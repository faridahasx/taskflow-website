import "./AnalyticsHeading.css";

const AnalyticsHeading = ({ start, end }) => {
  return (
    <h1 id="analytics-heading" className="flex">
      Task Analytics:
      {start && (
        <span id="analytics-dt-container" className="center">
          <span className="center datetime">
            <time dateTime={start}>{start}</time>
          </span>{" "}
          -
          <span className="center datetime">
            <time dateTime={end}>{end}</time>
          </span>
        </span>
      )}
    </h1>
  );
};

export default AnalyticsHeading;
