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

    const { result, waitForNextUpdate } = renderHook(() => useAuthRequest());
    const [executeAuthRequest, loading] = result.current;

    // Mock a successful API call
    const successCallback = jest.fn();
    await executeAuthRequest(successCallback, "Success message", [], true);

    // Verify behavior
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ALERT",
      payload: "Success message",
    });
    expect(loading).toBe(false);
  });

  it("should handle an API error with a 401 status code", async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    const { result, waitForNextUpdate } = renderHook(() => useAuthRequest());
    const [executeAuthRequest, loading] = result.current;
    // Mock an API error with a 401 status code
    const errorCallback = () => {
      throw { response: { status: 401 } };
    };

    await executeAuthRequest(errorCallback, null, [], true);
    expect(dispatchMock).toBeCalledWith({
      type: "ALERT",
      payload: "Not logged",
    });
    expect(loading).toBe(false);
  });

  it("should handle an unknown API error", async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    const { result, waitForNextUpdate } = renderHook(() => useAuthRequest());
    const [executeAuthRequest, loading] = result.current;
    // Mock an API error with an error
    const errorCallback = () => {
      throw 'Error';
    };
    await executeAuthRequest(errorCallback, null, [], true);
    expect(dispatchMock).toBeCalledWith({
      type: "ALERT",
      payload: "An error has occured",
    });
    expect(loading).toBe(false);
  });
});
