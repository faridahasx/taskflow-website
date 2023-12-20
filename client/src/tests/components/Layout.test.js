import { render, screen} from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";
import { categoriesSample } from "../../constants/sampleData";
import { clickByTestId, clickByTitle } from "../../testUtilities";
import Layout from "../../components/Layout/Layout";

const { getByTestId } = screen;


let component;
let mockNavigate;

beforeEach(() => {
  mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  const store = mockStore(mockInitialState);
  component = render(
    <Provider store={store}>
      <BrowserRouter>
        <Layout children={null}/>
      </BrowserRouter>
    </Provider>
  );
});

describe("Layout", () => {
  describe("Header", () => {
    it("it renders Header component", () => {
      expect(document.getElementById("header")).toBeInTheDocument();
    });

    it("handles clicks on toggle open categories", () => {
      expect(getByTestId("categories")).not.toHaveClass(
        "categories-slider-open"
      );
      clickByTitle('Open categories')
      expect(getByTestId("categories")).toHaveClass("categories-slider-open");
      clickByTitle('Close categories')

      expect(getByTestId("categories")).not.toHaveClass(
        "categories-slider-open"
      );
    });
  });

  describe("Link clicks", () => {

    it("closes categories slider when navigating", () => {
      clickByTitle('Open categories')
      expect(getByTestId("categories")).toHaveClass("categories-slider-open");
      clickByTestId('header-home-link')
      expect(getByTestId("categories")).not.toHaveClass(
        "categories-slider-open"
      );
    });

    it("handles click on logo", () => {
      clickByTestId('header-home-link')
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("handles click on stats link", () => {
      clickByTestId('header-stats-link')
      expect(mockNavigate).toHaveBeenCalledWith("/stats");
    });

  });
  describe("CategoriesSliderContainer", () => {
    it("renders categories list items", () => {
      expect(document.getElementsByClassName("category-li")).toHaveLength(
        categoriesSample.length
      );
    });
  });
});
