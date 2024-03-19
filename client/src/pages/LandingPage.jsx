import { useState } from "react";
import Logo from "../components/Logo/Logo";
import AuthDialog from "../components/Auth/AuthDialog";
import SubmitButton from "../components/TextButtons/SubmitButton";
import "./LandingPage.css";

const LandingPage = () => {
  const [displayAuthDialog, setDisplayAuthDialog] = useState(false);

  const toggleDisplayAuthDialog = () => setDisplayAuthDialog((prev) => !prev);

  return (
    <main id="landing-page">
      <Logo />
      <h1 id="lp-h1" className="center">
        Elevate your productivity with TaskFlow: your personalized task
        management tool.
      </h1>
      <p id="lp-p">
        Try TaskFlow today and excel at your tasks like never before!
      </p>
      <SubmitButton
        id='lp-btn'
        buttonText="Get Started"
        onClick={toggleDisplayAuthDialog}
      />
      {displayAuthDialog && (
        <AuthDialog handleCloseAuthDialog={toggleDisplayAuthDialog} />
      )}
    </main>
  );
};

export default LandingPage;
