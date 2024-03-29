// External imports
import { Component } from "react";
import { UNKNOWN_ERROR } from "constants/alertMessages";
// Components
import ExceptionContainer from "./ExceptionContainer";

// ErrorBoundary class component
export default class ErrorBoundary extends Component {
  // Set initial state
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Static method to handle errors during rendering
  static getDerivedStateFromError(error) {
    // Update state to indicate that an error has occured
    return { hasError: true };
  }

  // Lifecycle method called after an error has been caught
  componentDidCatch(error, errorInfo) {
    // Log error details for debugging purposes
    console.log("ERROR_BOUNDARY_CATCH:", error, errorInfo);
  }

  render() {
    // Render the Error compoment if there's an error
    if (this.state.hasError) {
      return <ExceptionContainer message={UNKNOWN_ERROR} />;
    }

    // Render children components if no error occured
    return this.props.children;
  }
}
