import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { axiosWithCredentials } from "../../../assets/axiosInstance";
import { mockStore } from "../../mocks/mockReduxState";
import {
  changeByLabelText,
  clickByText,
  pressEnter,
} from "../../../testUtilities";
import AuthDialog from "../../../components/Auth/AuthDialog";

const { getByText, getByLabelText, queryByLabelText } = screen;

const passwordLabel = "Password:";
const emailLabel = "Email:";
const firstnameLabel = "First Name:";
const lastnameLabel = "Last Name:";

const successResponse = { status: 200, data: "Success" };
const reduxStateOnMissingInputField = [
  {
    type: "ALERT",
    payload: "Please fill out all fields.",
  },
];

const reduxStateOnSuccessfullAuth = [
  { type: "IS_LOGGED", payload: true },
  { type: "ALERT", payload: successResponse.data },
  { type: "AUTH_DIALOG", payload: false },
];

let store;
let component;
let container;

beforeEach(() => {
  store = mockStore({});
  component = render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthDialog handleCloseAuthDialog={jest.fn()} />
      </BrowserRouter>
    </Provider>
  );
  container = component.container;
});

describe("AuthDialog: Sign In", () => {
  it("renders the correct navigation button", () => {
    expect(getByText("Sign up instead")).toBeInTheDocument();
  });

  it("navigates to Sign up view", () => {
    clickByText("Sign up instead");
    expect(getByText("Sign in instead")).toBeInTheDocument();
  });

  it("navigates back to Sign in view", () => {
    clickByText("Sign up instead");
    clickByText("Sign in instead");
    expect(getByText("Sign up instead")).toBeInTheDocument();
  });

  it("renders email and password input fileds", () => {
    expect(getByLabelText(emailLabel)).toBeInTheDocument();
    expect(getByLabelText(passwordLabel)).toBeInTheDocument();
  });

  it("doesn't render firstname and lastname input fileds", () => {
    expect(queryByLabelText(firstnameLabel)).not.toBeInTheDocument();
    expect(queryByLabelText(lastnameLabel)).not.toBeInTheDocument();
  });

  it("renders changes in email input field", () => {
    const email = changeByLabelText(emailLabel, emailLabel);
    expect(email).toHaveValue(emailLabel);
  });

  it("renders changes in password input field", () => {
    const password = changeByLabelText(passwordLabel, passwordLabel);
    expect(password).toHaveValue(passwordLabel);
  });
});

describe("AuthDialog: Sign Up", () => {
  beforeEach(() => {
    clickByText("Sign up instead");
  });

  it("renders all input fileds", () => {
    expect(getByLabelText(emailLabel)).toBeInTheDocument();
    expect(getByLabelText(passwordLabel)).toBeInTheDocument();
    expect(getByLabelText(firstnameLabel)).toBeInTheDocument();
    expect(getByLabelText(lastnameLabel)).toBeInTheDocument();
  });

  it("renders changes in email input field", () => {
    const email = changeByLabelText(emailLabel, "email");
    expect(email).toHaveValue("email");
  });

  it("renders changes in password input field", () => {
    const password = changeByLabelText(passwordLabel, "password");
    expect(password).toHaveValue("password");
  });

  it("renders changes in first name input field", () => {
    const firstName = changeByLabelText(firstnameLabel, "firstName");
    expect(firstName).toHaveValue("firstName");
  });

  it("renders changes in last name input field", () => {
    const lastName = changeByLabelText(lastnameLabel, "lastName");
    expect(lastName).toHaveValue("lastName");
  });
});

describe("AuthDialog: Submit Events", () => {
  beforeEach(() => {
    axiosWithCredentials.post = jest.fn(() => successResponse);
  });
  describe("Successfull submits", () => {
    describe("Sign in", () => {
      beforeEach(() => {
        changeByLabelText(emailLabel, "email");
        changeByLabelText(passwordLabel, "password");
      });

      it("handles 'Enter' key press", async () => {
        pressEnter(container);
        const actions = store.getActions();
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnSuccessfullAuth)
        );
      });

      it("handles submit form button click", async () => {
        clickByText("Sign in");
        const actions = store.getActions();
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnSuccessfullAuth)
        );
      });
    });

    describe("Sign up", () => {
      beforeEach(() => {
        clickByText("Sign up instead");
        changeByLabelText(emailLabel, "email");
        changeByLabelText(passwordLabel, "password");
        changeByLabelText(firstnameLabel, "firstName");
        changeByLabelText(lastnameLabel, "lastName");
      });

      it("handles 'Enter' key press", async () => {
        pressEnter(container);
        const actions = store.getActions();
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnSuccessfullAuth)
        );
      });

      it("handles submit form button click", async () => {
        clickByText("Sign up");
        const actions = store.getActions();
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnSuccessfullAuth)
        );
      });
    });
  });

  describe("Missing input fields", () => {
    describe("Sign in", () => {
      it("missing password", async () => {
        changeByLabelText(emailLabel, "email");
        pressEnter(container);

        const actions = store.getActions();
        // Assertions
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnMissingInputField)
        );
      });
      it("missing email", async () => {
        changeByLabelText(passwordLabel, "password");
        pressEnter(container);

        const actions = store.getActions();
        // Assertions
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnMissingInputField)
        );
      });
    });

    describe("Sign up", () => {
      beforeEach(() => {
        clickByText("Sign up instead");
      });
      it("missing email", async () => {
        changeByLabelText(passwordLabel, "password");
        changeByLabelText(firstnameLabel, "firstName");
        changeByLabelText(lastnameLabel, "lastName");
        pressEnter(container);
        const actions = store.getActions();

        // Assertions
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnMissingInputField)
        );
      });
      it("missing password", async () => {
        changeByLabelText(emailLabel, "email");
        changeByLabelText(firstnameLabel, "firstName");
        changeByLabelText(lastnameLabel, "lastName");
        pressEnter(container);

        const actions = store.getActions();

        // Assertions
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnMissingInputField)
        );
      });

      it("missing first name", async () => {
        changeByLabelText(emailLabel, "email");
        changeByLabelText(passwordLabel, "password");
        changeByLabelText(lastnameLabel, "lastName");
        pressEnter(container);

        const actions = store.getActions();

        // Assertions
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnMissingInputField)
        );
      });
      it("missing last name", async () => {
        changeByLabelText(emailLabel, "email");
        changeByLabelText(passwordLabel, "password");
        changeByLabelText(firstnameLabel, "firstName");
        pressEnter(container);

        const actions = store.getActions();

        // Assertions
        await waitFor(() =>
          expect(actions).toEqual(reduxStateOnMissingInputField)
        );
      });
    });
  });

  it("handles server side errors", async () => {
    axiosWithCredentials.post = jest.fn(() => {
      throw Error("");
    });
    changeByLabelText(emailLabel, "email");
    changeByLabelText(passwordLabel, "password");
    pressEnter(container);

    const actions = store.getActions();

    // Assertions
    await waitFor(() =>
      expect(actions).toEqual([
        { type: "ALERT", payload: "Something went wrong" },
      ])
    );
  });
});
