import { render, waitFor } from "test-utilities/test-utils";
import AuthFormContainer from "containers/AuthFormContainer";
import { mockStore } from "../../test-utilities/mocks/mockReduxState";
import {
  clickByText,
  changeByLabelText,
} from "test-utilities/user-interaction";
import { UNKNOWN_ERROR } from "constants/alertMessages";
import { axiosWithCredentials } from "utils/axiosInstance";
import {
  passwordLabel,
  emailLabel,
  firstnameLabel,
  lastnameLabel,
  successResponse,
  reduxStateOnMissingInputField,
} from "test-utilities/constants";

let store;

const reduxStateOnSuccessfullAuth = [
  { type: "IS_LOGGED", payload: true },
  { type: "ALERT", payload: successResponse.data },
];

beforeEach(() => {
  store = mockStore({});
  axiosWithCredentials.post = jest.fn(() => successResponse);
});

const renderSignInTab = () => {
  return render(
    <AuthFormContainer path={"login"} subtmitButtonText={"Sign in"} />,
    {
      props: { store: store },
    }
  );
};

const renderSignUpTab = () => {
  return render(
    <AuthFormContainer path={"register"} subtmitButtonText={"Sign up"} />,
    {
      props: { store: store },
    }
  );
};

describe("AuthFormContainer: Submit Events", () => {
  describe("Sign in", () => {
    it("handles successfull form submit", async () => {
      renderSignInTab();
      changeByLabelText(emailLabel, "email");
      changeByLabelText(passwordLabel, "password");
      clickByText("Sign in");
      const actions = store.getActions();
      await waitFor(() => expect(actions).toEqual(reduxStateOnSuccessfullAuth));
    });
    it("handles server side errors", async () => {
      renderSignInTab();

      axiosWithCredentials.post = jest.fn(() => {
        throw Error("");
      });
      changeByLabelText(emailLabel, "email");
      changeByLabelText(passwordLabel, "password");
      const actions = store.getActions();
      clickByText("Sign in");

      // Assertions
      await waitFor(() =>
        expect(actions).toEqual([{ type: "ALERT", payload: UNKNOWN_ERROR }])
      );
    });
    it("missing password", async () => {
      renderSignInTab();
      changeByLabelText(emailLabel, "email");
      clickByText("Sign in");
      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual(reduxStateOnMissingInputField)
      );
    });
    it("missing email", async () => {
      renderSignInTab();
      changeByLabelText(passwordLabel, "password");
      clickByText("Sign in");
      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual(reduxStateOnMissingInputField)
      );
    });
  });

  describe("Sign Up", () => {
    it("handles successfull form submit", async () => {
      renderSignUpTab();
      changeByLabelText(emailLabel, "email");
      changeByLabelText(passwordLabel, "password");
      changeByLabelText(firstnameLabel, "firstName");
      changeByLabelText(lastnameLabel, "lastName");
      clickByText("Sign up");

      const actions = store.getActions();
      // Assertions
      await waitFor(() => expect(actions).toEqual(reduxStateOnSuccessfullAuth));
    });
    it("handles server side errors", async () => {
      renderSignUpTab();

      axiosWithCredentials.post = jest.fn(() => {
        throw Error("");
      });
      changeByLabelText(emailLabel, "email");
      changeByLabelText(passwordLabel, "password");
      changeByLabelText(firstnameLabel, "firstName");
      changeByLabelText(lastnameLabel, "lastName");
      clickByText("Sign up");

      const actions = store.getActions();

      // Assertions
      await waitFor(() =>
        expect(actions).toEqual([{ type: "ALERT", payload: UNKNOWN_ERROR }])
      );
    });
    it("missing email", async () => {
      renderSignUpTab();
      changeByLabelText(passwordLabel, "password");
      changeByLabelText(firstnameLabel, "firstName");
      changeByLabelText(lastnameLabel, "lastName");
      clickByText("Sign up");

      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual(reduxStateOnMissingInputField)
      );
    });
    it("missing password", async () => {
      renderSignUpTab();
      changeByLabelText(emailLabel, "email");
      changeByLabelText(firstnameLabel, "firstName");
      changeByLabelText(lastnameLabel, "lastName");
      clickByText("Sign up");

      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual(reduxStateOnMissingInputField)
      );
    });
    it("missing first name", async () => {
      renderSignUpTab();
      changeByLabelText(emailLabel, "email");
      changeByLabelText(passwordLabel, "password");
      changeByLabelText(lastnameLabel, "lastName");
      clickByText("Sign up");

      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual(reduxStateOnMissingInputField)
      );
    });
    it("missing last name", async () => {
      renderSignUpTab();
      changeByLabelText(emailLabel, "email");
      changeByLabelText(passwordLabel, "password");
      changeByLabelText(firstnameLabel, "firstName");
      clickByText("Sign up");

      const actions = store.getActions();
      // Assertions
      await waitFor(() =>
        expect(actions).toEqual(reduxStateOnMissingInputField)
      );
    });
  });
});
