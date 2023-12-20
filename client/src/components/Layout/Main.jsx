import PropTypes from "prop-types";
// Components
import CategoriesSliderContainer from "../../containers/Categories/CategoriesSliderContainer";
import CategoriesUnauthorizedView from "../Categories/CategoriesUnauthorizedView";

const Main = (props) => {
  // Destructuring props
  const {
    children,
    categoriesOpen,
    setCategoriesOpen,
    isLogged,
    handleDisplayAuthDialog,
  } = props;

  return (
    <main>
      {isLogged === true ? (
        <CategoriesSliderContainer
          categoriesOpen={categoriesOpen}
          setCategoriesOpen={setCategoriesOpen}
        />
      ) : (
        isLogged === false && (
          <CategoriesUnauthorizedView
            handleDisplayAuthDialog={handleDisplayAuthDialog}
            categoriesOpen={categoriesOpen}
            setCategoriesOpen={setCategoriesOpen}
          />
        )
      )}

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
