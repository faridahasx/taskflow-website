import PropTypes from "prop-types";
// Constant data
import sortFields from "constants/sortFields";
// Custom hooks
import useClickOutside from "hooks/useClickOutside";
// Components
import DialogWrapper from "components/DialogWrapper/DialogWrapper";
import SortField from "./SortField";
// Styles
import "./Sort.css";

const Sort = (props) => {
  // Destructuring props
  const { currentSort, handleSorting, handleClose } = props;
  // Ref for handling clicks outside the container
  const containerRef = useClickOutside(handleClose);

  // Render compomnent
  return (
    <DialogWrapper
      className="sort-dialog"
      heading={"Sort By"}
      containerRef={containerRef}
      handleClose={handleClose}
    >
      <ul aria-label="Sort Tasks" id="sort-ul" data-testid="sort">
        {sortFields.map((s) => (
          <SortField
            key={s.value}
            name={s.name}
            value={s.value}
            currentSort={currentSort}
            handleSorting={handleSorting}
          />
        ))}
      </ul>
    </DialogWrapper>
  );
};

Sort.propTypes = {
  currentSort: PropTypes.string,
  handleSorting: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Sort;
