// External imports
import PropTypes from "prop-types";
// MUI components
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

const DatePicker = (props) => {
  // Destructure props
  const { name, label, date, setDate, sx } = props;
  return (
    <LocalizationProvider sx={sx} dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        value={date}
        onChange={setDate}
        sx={sx}
        label={label}
        name={name}
      />
    </LocalizationProvider>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  date: PropTypes.any,
  setDate: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default DatePicker;
