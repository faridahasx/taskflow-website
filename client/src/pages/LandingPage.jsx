import { useState, lazy, Suspense } from "react";
import Logo from "components/Logo/Logo";
import SubmitButton from "components/TextButtons/SubmitButton";
import ModalLoading from "components/Loading/ModalLoading";
import "./LandingPage.css";

const AuthDialog = lazy(() => import("components/Auth/AuthDialog"));

const LandingPage = () => {
  const [displayAuthDialog, setDisplayAuthDialog] = useState(false);

  const toggleDisplayAuthDialog = () => setDisplayAuthDialog((prev) => !prev);

  return (
    <main id="landing-page">
      <Logo />
      <h1 id="lp-h1" className="center">
        Elevate your productivity with TaskFlow.
      </h1>
      {/* <p id="lp-p">Try it today and excel at your tasks like never before!</p> */}
      <SubmitButton
        id="lp-btn"
        buttonText="Get Started"
        onClick={toggleDisplayAuthDialog}
      />

      {displayAuthDialog && (
        <Suspense
          fallback={<ModalLoading handleClose={toggleDisplayAuthDialog} />}
        >
          <AuthDialog handleCloseAuthDialog={toggleDisplayAuthDialog} />
        </Suspense>
      )}
    </main>
  );
};

export default LandingPage;
