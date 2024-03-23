import { MISSING_INPUT_FIELD } from "constants/alertMessages";

// AUTH
export const passwordLabel = "Password:";
export const emailLabel = "Email:";
export const firstnameLabel = "First Name:";
export const lastnameLabel = "Last Name:";

// Server responses
export const successResponse = { status: 200, data: "Success" };

// Redux state
export const reduxStateOnMissingInputField = [
  {
    type: "ALERT",
    payload: MISSING_INPUT_FIELD,
  },
];
