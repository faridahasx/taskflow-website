// External imports
import PropTypes from "prop-types";
// MUI components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

// Menu props
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const CategoriesFilter = (props) => {
  // Destructuring props
  const { categories, selectedCategories, setSelectedCategories } = props;

  // Handle change in category selection
  const handleChange = (e) => {
    e.preventDefault();
    let {
      target: { value },
    } = e;
    value = typeof value === "string" ? value.split(",") : value;
    // Update selected categories based on the value
    const updatedCategories =
      value[value.length - 1] === "All"
        ? ["All"]
        : value[0] === "All"
          ? [value[1]]
          : value;
    // Set the updated categories in the state
    setSelectedCategories(updatedCategories);
  };

  return (
    <div className="filter-component">
      <InputLabel id="category-filter-label">Select categories:</InputLabel>
      <FormControl sx={{ width: "100%" }}>
        <Select
          id="filter-category"
          labelId="category-filter-label"
          value={selectedCategories}
          renderValue={() => selectedCategories.join(", ")}
          onChange={handleChange}
          MenuProps={MenuProps}
          displayEmpty
          multiple
        >
          {categories.map((c) => (
            <MenuItem key={c.title} className="portal" value={c.title}>
              <Checkbox
                className="portal"
                checked={selectedCategories.indexOf(c.title) > -1}
              />
              <ListItemText className="portal" primary={c.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

CategoriesFilter.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
};

export default CategoriesFilter;
