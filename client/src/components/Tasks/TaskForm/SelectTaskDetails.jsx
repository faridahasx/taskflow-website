// External imports
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Components
import DatePicker from "../../DatePicker";
import SelectCategory from "./SelectCategory";
// Styles
import "./SelectTaskDetails.css";

const SelectTaskDetails = (props) => {
  // Destructure props
  const {
    handleInputChange,
    handleSetStartDate,
    handleSetFinishDate,
    category,
    startDate,
    finishDate,
    categories,
  } = props;

  return (
    <div id="select-task-details" className="flex">
      <div className="select-task-detail">
        <SelectCategory
          handleInputChange={handleInputChange}
          category={category}
          categories={categories}
        />
      </div>
      <div className="select-task-detail">
        <DatePicker
          name="startDate"
          label="Start Date"
          date={startDate}
          setDate={handleSetStartDate}
          sx={{ width: "100%" }}
        />
      </div>
      <div className="select-task-detail">
        <DatePicker
          name="finishDate"
          label="Finish Date"
          date={finishDate}
          setDate={handleSetFinishDate}
          sx={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

SelectTaskDetails.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSetStartDate: PropTypes.func.isRequired,
  handleSetFinishDate: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(dayjs),
  finishDate: PropTypes.instanceOf(dayjs),
};

export default SelectTaskDetails;
