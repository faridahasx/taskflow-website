import { renderHook } from "test-utilities/test-utils";
import { useDispatch } from "react-redux";
import useMakeServerRequest from "hooks/useMakeServerRequest";
import { UNAUTHORIZED, UNKNOWN_ERROR } from "constants/alertMessages";

let dispatchMock;
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const render = () => {
  const { result } = renderHook(() => useMakeServerRequest());
  return result.current;
};

beforeEach(() => {
  dispatchMock = jest.fn();
  useDispatch.mockReturnValue(dispatchMock);
});

describe("useMakeServerRequest", () => {
  it("should handle a successful request", async () => {
    const { executeServerRequest } = render();

    // Mock a successful API call
    await executeServerRequest({
      callback: jest.fn(),
      successMessage: "Success message",
    });

    // Verify behavior
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ALERT",
      payload: "Success message",
    });
  });

  it("should handle an API error with a 401 status code", async () => {
    const { executeServerRequest } = render();

    // Mock an API error with a 401 status code
    const errorCallback = () => {
      const error = Error("");
      error.response = { status: 401 };
      throw error;
    };

    await executeServerRequest({
      callback: errorCallback,
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ALERT",
      payload: UNAUTHORIZED,
    });
  });

  it("should handle an unknown API error", async () => {
    const { executeServerRequest } = render();

    // Mock an API error with an error
    const errorCallback = () => {
      throw Error("");
    };

    await executeServerRequest({
      callback: errorCallback,
      fallbackErrorMessage: UNKNOWN_ERROR,
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ALERT",
      payload: UNKNOWN_ERROR,
    });
  });
});
