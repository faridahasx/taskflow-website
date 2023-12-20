// External imports
import PropTypes from "prop-types";
// MUI Components
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const SelectCategory = (props) => {
  // Destructure props
  const { handleInputChange, category, categories } = props;

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="category">Category</InputLabel>
      <Select
        id="category"
        labelId="category"
        value={category || "All"}
        name="category"
        label="category"
        onChange={handleInputChange}
      >
        {categories.map((cat) => (
          <MenuItem value={cat.title} key={cat._id}>
            {cat.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectCategory.propTypes = {
  category: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default SelectCategory;
