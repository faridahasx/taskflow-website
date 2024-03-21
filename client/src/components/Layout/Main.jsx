import PropTypes from "prop-types";
// Components
import CategoriesSliderContainer from "containers/Categories/CategoriesSliderContainer";

const Main = (props) => {
  // Destructuring props
  const { children, categoriesOpen, setCategoriesOpen } = props;

  return (
    <main>
      <CategoriesSliderContainer
        categoriesOpen={categoriesOpen}
        setCategoriesOpen={setCategoriesOpen}
      />
      {children}
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object]),
  categoriesOpen: PropTypes.bool.isRequired,
  setCategoriesOpen: PropTypes.func.isRequired,
};

export default Main;
