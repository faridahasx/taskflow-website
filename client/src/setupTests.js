/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("./assets/axiosInstance", () => ({
  axiosWithCredentials: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  },
}));

jest.mock("./context/TaskContext");

jest.setTimeout(15000);
