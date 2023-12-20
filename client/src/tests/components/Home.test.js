import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MockIntersectionObserver } from "../mocks/mockClasses";
import { mockAuthState, mockStore } from "../mocks/mockReduxState";
import { clickByTitle } from "../../testUtilities";
import Home from "../../pages/Home";

const { queryByTestId, getByTestId } = screen;

let store;
let component;

beforeEach(() => {
  global.IntersectionObserver = MockIntersectionObserver;
});

describe("Home", () => {
  beforeEach(() => {
    store = mockStore(mockAuthState);
    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });
  describe("Navigation", () => {
    it("renders Navigation component", () => {
      expect(getByTestId("nav")).toBeInTheDocument();
    });

    it("handles open Sort", async () => {
      const sort = queryByTestId("sort");
      expect(sort).not.toBeInTheDocument();
      clickByTitle("Sort");
      await waitFor(
        () => {
          expect(queryByTestId("sort")).toBeInTheDocument();
        },
        { timeout: 7000 }
      );
    });

    it("handles open Search", async () => {
      expect(queryByTestId("search")).not.toBeInTheDocument();
      clickByTitle("Search");
      await waitFor(
        () => {
          expect(queryByTestId("search")).toBeInTheDocument();
        },
        { timeout: 7000 }
      );
    });

    it("renders search input", async () => {
      clickByTitle("Search");
      await waitFor(
        () => {
          const input = getByTestId("search");
          fireEvent.change(input, { target: { value: "search" } });
          expect(input).toHaveValue("search");
        },
        { timeout: 7000 }
      );
    });
  });
});
