import { renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import useAuthRequest from "../../hooks/useAuthRequest";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("useAuthRequest", () => {
  it("should handle a successful auth request", async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const { result } = renderHook(() => useAuthRequest());
    const { executeAuthRequest } = result.current;

    // Mock a successful API call
    await executeAuthRequest({
      callback: jest.fn(),
      successMessage: "Success message",
      trackLoadingState: true,
    });

    // Verify behavior
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ALERT",
      payload: "Success message",
    });
  });

  it("should handle an API error with a 401 status code", async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    const { result } = renderHook(() => useAuthRequest());
    const { executeAuthRequest } = result.current;
    // Mock an API error with a 401 status code
    const errorCallback = () => {
      throw { response: { status: 401 } };
    };

    await executeAuthRequest({
      callback: errorCallback,
    });

    expect(dispatchMock).toBeCalledWith({
      type: "ALERT",
      payload: "Not logged",
    });
  });

  it("should handle an unknown API error", async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    const { result } = renderHook(() => useAuthRequest());
    const { executeAuthRequest } = result.current;
    // Mock an API error with an error
    const errorCallback = () => {
      throw "Error";
    };
    await executeAuthRequest({
      callback: errorCallback,
    });
    expect(dispatchMock).toBeCalledWith({
      type: "ALERT",
      payload: "Something went wrong",
    });
  });
});
