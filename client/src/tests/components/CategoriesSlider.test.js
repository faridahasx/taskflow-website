import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { categoriesSample } from "../../constants/sampleData";
import { pressEscape } from "../../testUtilities";
import CategorieSlider from "../../components/Categories/CategoriesSlider";

const mockFn = jest.fn();
let mockSetCategoriesOpen = jest.fn();

let component;
describe("CategoriesSlider", () => {
  describe("loading is true, categoriesOpen is false", () => {
    beforeEach(() => {
      component = render(
        <BrowserRouter>
          <CategorieSlider
            categories={categoriesSample}
            loading={true}
            categoriesOpen={false}
            setCategoriesOpen={mockSetCategoriesOpen}
            handleLinkClick={mockFn}
          />
        </BrowserRouter>
      );
    });

    it("renders loading indicator", () => {
      const loading = screen.getByTestId("loading");
      expect(loading).toBeInTheDocument();
    });

    it("doesn't render category list items", () => {
      const items = document.getElementsByClassName("category-li");
      expect(items).toHaveLength(0);
    });
    it("renders categories slider with open and closed states", () => {
      const { rerender, getByTestId } = component;
      const container = getByTestId("categories");
      expect(container).not.toHaveClass("categories-slider-open");

      rerender(
        <BrowserRouter>
          <CategorieSlider
            categories={categoriesSample}
            loading={true}
            categoriesOpen={true}
            setCategoriesOpen={mockSetCategoriesOpen}
            handleLinkClick={mockFn}
          />
        </BrowserRouter>
      );
      expect(container).toHaveClass("categories-slider-open");
    });
    it("doesn't listen for 'Escape' key press events", () => {
      const { container } = component;
      pressEscape(container);
      expect(mockSetCategoriesOpen).not.toHaveBeenCalled();
    });
  });

  describe("loading is false, categoriesOpen is true", () => {
    beforeEach(() => {
      mockSetCategoriesOpen = jest.fn();
      component = render(
        <BrowserRouter>
          <CategorieSlider
            categories={categoriesSample}
            loading={false}
            categoriesOpen={true}
            setCategoriesOpen={mockSetCategoriesOpen}
            handleLinkClick={mockFn}
          />
        </BrowserRouter>
      );
    });

    it("renders category list items", () => {
      const items = document.getElementsByClassName("category-li");
      expect(items).toHaveLength(categoriesSample.length);
    });
    it("handles background click", () => {
      fireEvent.click(document.getElementById("categories-dropdown"));
      expect(mockSetCategoriesOpen).toHaveBeenCalledWith(false);
    });
    it("handles 'Escape' key press", () => {
      const { container } = component;
      pressEscape(container);
      expect(mockSetCategoriesOpen).toHaveBeenCalledWith(false);
    });
  });
});
