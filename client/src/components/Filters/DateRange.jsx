import PropTypes from "prop-types";
// MUI components
import InputLabel from "@mui/material/InputLabel";
// Components
import DatePicker from "../DatePicker";

const DateRange = (props) => {
  const { start, end, setStart, setEnd, label } = props;
  return (
    <div className="sf-component">
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
  start: PropTypes.any,
  end: PropTypes.any,
  setStart: PropTypes.func.isRequired,
  setEnd: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default DateRange;
