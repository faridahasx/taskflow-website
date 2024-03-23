import PropTypes from "prop-types";
// MUI components
import InputLabel from "@mui/material/InputLabel";
// Components
import DatePicker from "components/DatePicker";

const DateRange = (props) => {
  const { label, start, end, setStart, setEnd } = props;
  return (
    <div className="filter-component">
      <InputLabel id="category-filter-label">{label}</InputLabel>
      <DatePicker
        name="Start"
        label="Start"
        date={start}
        setDate={setStart}
        sx={{ width: "50%" }}
      />
      <DatePicker
        name="End"
        label="End"
        date={end}
        setDate={setEnd}
        sx={{ width: "50%", paddingLeft: "5px" }}
      />
    </div>
  );
};

DateRange.propTypes = {
  label: PropTypes.string.isRequired,
  start: PropTypes.any,
  end: PropTypes.any,
  setStart: PropTypes.func.isRequired,
  setEnd: PropTypes.func.isRequired,
};

export default DateRange;
