import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { axiosWithCredentials } from "../../../assets/axiosInstance";
import { mockAuthState, mockStore } from "../../mocks/mockReduxState";
import SearchContainer from "../../../containers/SearchContainer";

const successResponse = { status: 200, data: [] };

describe("SearchContainer", () => {
  const inputValue = "inputValue";
  it("should make an API call when input changes", async () => {
    // Render the component
    const { getByTestId } = render(
      <Provider store={mockStore(mockAuthState)}>
        <BrowserRouter>
          <SearchContainer handleClose={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    axiosWithCredentials.get = jest.fn(() => successResponse);
    // Simulate user input
    fireEvent.change(getByTestId("search"), {
      target: { value: inputValue },
    });

    // Assertions
    await waitFor(() =>
      expect(axiosWithCredentials.get).toHaveBeenCalledWith(
        `task?&limit=10&search[regex]=${inputValue}`
      )
    );
  });
});
