// External Imports
import { Suspense, lazy, useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// MUI Components
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
// Custom hooks
import useNetworkStatus from "hooks/useNetworkStatus";
// Components
import PageLoading from "components/Loading/PageLoading";
import ErrorBoundary from "components/Error/ErrorBoundary";
import Message from "components/Alerts/Message";
import Offline from "components/Alerts/Offline";
// Styles
import "assets/globals.css";
import ConfirmationDialog from "components/ConfirmationDialog/ConfirmationDialog";
import freeServerMessage from "components/freeServerMessage";

// Lazily loaded components
const Home = lazy(() => import("pages/Home"));
const LoginSuccessRedirect = lazy(() => import("pages/LoginSuccessRedirect"));
const TaskAnalytics = lazy(() => import("pages/TaskAnalytics"));
const LandingPage = lazy(() => import("pages/LandingPage"));

function App() {
  // Redux dispatch function
  const dispatch = useDispatch();
  // Check for user authentication status from Redux store
  const isLogged = useSelector((state) => state.auth.isLogged);
  // Check online status using custom hook
  const isOnline = useNetworkStatus();
  //
  const [displayMessage, setDisplayMessage] = useState(true);
  const closeDisplayMessage = () => setDisplayMessage(false);

  //Adjusts the viewport height on window resize
  useEffect(() => {
    const setInnerHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`
      );
    };
    // Set initial inner height and add event listener for resize
    setInnerHeight();
    window.addEventListener("resize", setInnerHeight);
    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", setInnerHeight);
    };
  }, []);

  // Checks for first login and dispatches the appropriate action
  useLayoutEffect(() => {
    const getFirstLogin = () => {
      const firstLogin = localStorage.getItem("firstLogin");
      dispatch({ type: "IS_LOGGED", payload: firstLogin ? true : false });
    };
    // Dispatches action only if not logged in
    if (isLogged === null) getFirstLogin();
  }, [isLogged, dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Message />
        {!isOnline && <Offline />}
        {displayMessage && (
          <ConfirmationDialog
            heading={freeServerMessage}
            confirmButtonText={"Continue"}
            handleCloseDialog={closeDisplayMessage}
            handleConfirm={closeDisplayMessage}
          />
        )}
        <ErrorBoundary>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  isLogged === false ? (
                    <LandingPage />
                  ) : isLogged === true ? (
                    <Home />
                  ) : (
                    <PageLoading />
                  )
                }
              />
              <Route
                exact
                path="/analytics"
                element={
                  isLogged === false ? (
                    <Navigate replace to="/" />
                  ) : isLogged === true ? (
                    <TaskAnalytics />
                  ) : (
                    <PageLoading />
                  )
                }
              />

              <Route path="/redirect" element={<LoginSuccessRedirect />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
