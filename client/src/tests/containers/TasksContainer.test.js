import { render, waitFor } from "test-utilities/test-utils";
import { axiosWithCredentials } from "utils/axiosInstance";
import { getTasksRequestQueryFromURL } from "utils/tasksURLSearchParamsUtils";
import { tasksSample } from "constants/sampleData";
import TasksContainer from "containers/Tasks/TasksContainer";
import { mockAuthState, mockStore } from "test-utilities/mocks/mockReduxState";
import { MockIntersectionObserverIntersecting } from "test-utilities/mocks/mockClasses";

let store;
let mockDispatchTasks;
let queryString;

const renderComponent = () => {
  return render(<TasksContainer />, {
    props: { store: store, mockDispatchTasks: mockDispatchTasks },
  });
};

describe("TasksListContainer", () => {
  beforeEach(() => {
    global.IntersectionObserver = MockIntersectionObserverIntersecting;
    Object.defineProperty(window, "location", {
      value: {
        search: "?startgte=2022-01-01",
      },
      writable: true,
    });

    store = mockStore(mockAuthState);
    mockDispatchTasks = jest.fn();
    queryString = getTasksRequestQueryFromURL();
    axiosWithCredentials.get = jest.fn(() => ({ data: tasksSample }));
  });
  it("should make a server request for initial for tasks", async () => {
    renderComponent();
    await waitFor(() =>
      expect(axiosWithCredentials.get).toHaveBeenNthCalledWith(
        1,
        `task?page=1&limit=9${queryString}`
      )
    );
  });

  it("should make a server request for more tasks", async () => {
    renderComponent();
    await waitFor(() =>
      expect(axiosWithCredentials.get).toHaveBeenNthCalledWith(
        2,
        `task?page=2&limit=9${queryString}`
      )
    );
  });

  it("should dispatch initial tasks", async () => {
    renderComponent();
    await waitFor(() =>
      expect(mockDispatchTasks).toHaveBeenNthCalledWith(1, {
        type: "initial_fetch",
        payload: tasksSample,
      })
    );
  });

  it("should dispatch more tasks", async () => {
    renderComponent();
    await waitFor(() =>
      expect(mockDispatchTasks).toHaveBeenNthCalledWith(2, {
        type: "fetch_more",
        payload: tasksSample,
      })
    );
  });
});
