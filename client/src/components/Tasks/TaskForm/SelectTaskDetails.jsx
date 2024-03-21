// External imports
import PropTypes from "prop-types";
import dayjs from "dayjs";
// Components
import DatePicker from "components/DatePicker";
import SelectCategory from "./SelectCategory";
// Styles
import "./SelectTaskDetails.css";

const SelectTaskDetails = (props) => {
  // Destructure props
  const {
    startDate,
    finishDate,
    category,
    categories,
    handleSetStartDate,
    handleSetFinishDate,
    handleInputChange,
  } = props;

  return (
    <div id="select-task-details" className="flex">
      <div aria-label="Category" className="select-task-detail">
        <SelectCategory
          category={category}
          categories={categories}
          handleInputChange={handleInputChange}
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
  startDate: PropTypes.instanceOf(dayjs),
  finishDate: PropTypes.instanceOf(dayjs),
  category: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  handleSetStartDate: PropTypes.func.isRequired,
  handleSetFinishDate: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default SelectTaskDetails;
