import { useState } from 'react';
import Logo from '../components/Logo/Logo'
import AuthDialog from '../components/Auth/AuthDialog';
import './LandingPage.css'
import SubmitButton from '../components/TextButtons/SubmitButton';


const LandingPage = () => {
    const [displayAuthDialog, setDisplayAuthDialog] = useState(false)

    const toggleDisplayAuthDialog = () => setDisplayAuthDialog(prev=>!prev)


  return (
    <>
    <main id='unauth-main'>
        <Logo/>
        <h1 className='center'>Your simple task management tool</h1>
        <SubmitButton buttonText='Get Started'  buttonProps={{onClick:toggleDisplayAuthDialog}}/>
    </main>
    {displayAuthDialog && (
        <AuthDialog handleCloseAuthDialog={toggleDisplayAuthDialog} />
      )}
    </>
  )
}

export default LandingPage