import { render, waitFor, screen, act } from "test-utilities/test-utils";
import { axiosWithCredentials } from "utils/axiosInstance";
import SearchContainer from "containers/SearchContainer";
import { changeByTestId } from "test-utilities/user-interaction";
import { mockStore } from "test-utilities/mocks/mockReduxState";

const successResponse = { status: 200, data: [] };
const renderComponent = () => {
  render(<SearchContainer handleClose={jest.fn()} />, {
    props: { store: mockStore({}), mockDispatchTasks: jest.fn() },
  });
};
describe("SearchContainer", () => {
  const inputValue = "value";
  it("should render input change", async () => {
    renderComponent();
    // Simulate user input
    act(() => {
      changeByTestId("search", inputValue);
    });
    // Assertions
    expect(screen.getByTestId("search")).toHaveValue(inputValue);
  });

  it("should make an API call when input changes", async () => {
    axiosWithCredentials.get = jest.fn(() => successResponse);
    renderComponent();
    // Simulate user input
    // changeByTestId("search", inputValue);
    act(() => {
      changeByTestId("search", inputValue);
    });
    // Assertions
    await waitFor(() =>
      expect(axiosWithCredentials.get).toHaveBeenCalledWith(
        `task?&limit=10&search[regex]=${inputValue}`
      )
    );
  });
});
