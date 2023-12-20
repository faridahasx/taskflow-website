import PropTypes from "prop-types";
// MUI components
import SwapVertIcon from "@mui/icons-material/SwapVert";
// Constant data
import sortFields from "../../constants/sortFields";
// Custom hooks
import useClickOutside from "../../hooks/useClickOutside";
// Components
import Dialog from "../SortAndFiltersWrapper/SortAndFiltersWrapper";
import SortFieldListItem from "./SortFieldListItem";
// Styles
import "./Sort.css";

const Sort = (props) => {
  // Destructuring props
  const { handleClose, handleSorting, sortValue } = props;
  // Ref for handling clicks outside the container
  const containerRef = useClickOutside(handleClose);

  // Render compomnent
  return (
    <Dialog
      handleClose={handleClose}
      heading={"Sort By"}
      Icon={<SwapVertIcon />}
      className="sort-dialog"
      containerRef={containerRef}
    >
      <ul id="sort-ul" data-testid="sort">
        {sortFields.map((s) => (
          <SortFieldListItem
            handleSorting={handleSorting}
            sortValue={sortValue}
            value={s.value}
            name={s.name}
            key={s.value}
          />
        ))}
      </ul>
    </Dialog>
  );
};

Sort.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSorting: PropTypes.func.isRequired,
  sortValue: PropTypes.string,
};

export default Sort;
