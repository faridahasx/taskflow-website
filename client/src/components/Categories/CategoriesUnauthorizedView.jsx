import CategorieSlider from "./CategoriesSlider";
import { categoriesSample } from "../../constants/sampleData";

const CategoriesUnauthorizedView = ({
  categoriesOpen,
  setCategoriesOpen,
  handleDisplayAuthDialog,
}) => {
  return (
    <CategorieSlider
      categories={categoriesSample}
      loading={false}
      categoriesOpen={categoriesOpen}
      setCategoriesOpen={setCategoriesOpen}
      handleLinkClick={handleDisplayAuthDialog}
    />
  );
};

export default CategoriesUnauthorizedView;
