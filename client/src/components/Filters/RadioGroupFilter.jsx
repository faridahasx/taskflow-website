import PropTypes from "prop-types";
// MUI components
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const RadioGroupFilter = ({
  value,
  onChange,
  name,
  option1Label,
  option2Label,
}) => {
  return (
    <div className="sf-component">
      <RadioGroup value={value} onChange={onChange} name={name}>
        <FormControlLabel
          value={true}
          control={<Radio />}
          label={option1Label}
        />
        <FormControlLabel
          value={false}
          control={<Radio />}
          label={option2Label}
        />
        <FormControlLabel value="" control={<Radio />} label="All" />
      </RadioGroup>
    </div>
  );
};

RadioGroupFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  option1Label: PropTypes.string.isRequired,
  option2Label: PropTypes.string.isRequired,
};

export default RadioGroupFilter;
