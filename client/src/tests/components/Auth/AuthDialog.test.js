import { render, screen } from "test-utilities/test-utils";
import AuthDialog from "components/Auth/AuthDialog";
import { mockStore } from "test-utilities/mocks/mockReduxState";
import {
  clickByText,
  changeByLabelText,
} from "test-utilities/user-interaction";
import {
  passwordLabel,
  emailLabel,
  firstnameLabel,
  lastnameLabel,
} from "test-utilities/constants";
let store;
let handleCloseAuthDialog;

beforeEach(() => {
  store = mockStore({});
  handleCloseAuthDialog = jest.fn();
});

const renderComponent = () => {
  render(<AuthDialog handleCloseAuthDialog={handleCloseAuthDialog} />, {
    props: { store: store },
  });
};

describe("AuthDialog", () => {
  describe("Sign In Tab", () => {
    it("renders the correct change tab button", () => {
      renderComponent();
      expect(screen.getByText("Sign up instead")).toBeInTheDocument();
    });

    it("navigates to Sign up tab", () => {
      renderComponent();
      clickByText("Sign up instead");
      expect(screen.getByText("Sign in instead")).toBeInTheDocument();
    });

    it("navigates back to Sign in tab", () => {
      renderComponent();
      clickByText("Sign up instead");
      clickByText("Sign in instead");
      expect(screen.getByText("Sign up instead")).toBeInTheDocument();
    });

    it("renders email and password fileds", () => {
      renderComponent();
      expect(screen.getByLabelText(emailLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(passwordLabel)).toBeInTheDocument();
    });

    it("doesn't render firstname and lastname fileds", () => {
      renderComponent();
      expect(screen.queryByLabelText(firstnameLabel)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(lastnameLabel)).not.toBeInTheDocument();
    });

    it("renders changes in email input", () => {
      renderComponent();
      const email = changeByLabelText(emailLabel, emailLabel);
      expect(email).toHaveValue(emailLabel);
    });

    it("renders changes in password input", () => {
      renderComponent();
      const password = changeByLabelText(passwordLabel, passwordLabel);
      expect(password).toHaveValue(passwordLabel);
    });
  });
  describe("Sign Up Tab", () => {
    it("renders all input fileds", () => {
      renderComponent();
      clickByText("Sign up instead");
      expect(screen.getByLabelText(emailLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(passwordLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(firstnameLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(lastnameLabel)).toBeInTheDocument();
    });

    it("renders changes in email input field", () => {
      renderComponent();
      clickByText("Sign up instead");
      const email = changeByLabelText(emailLabel, "email");
      expect(email).toHaveValue("email");
    });

    it("renders changes in password input field", () => {
      renderComponent();
      clickByText("Sign up instead");
      const password = changeByLabelText(passwordLabel, "password");
      expect(password).toHaveValue("password");
    });

    it("renders changes in first name input field", () => {
      renderComponent();
      clickByText("Sign up instead");
      const firstName = changeByLabelText(firstnameLabel, "firstName");
      expect(firstName).toHaveValue("firstName");
    });

    it("renders changes in last name input field", () => {
      renderComponent();
      clickByText("Sign up instead");
      const lastName = changeByLabelText(lastnameLabel, "lastName");
      expect(lastName).toHaveValue("lastName");
    });
  });
});
