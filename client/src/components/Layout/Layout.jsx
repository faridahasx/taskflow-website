// External imports
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
// Components
import AuthDialog from "../Auth/AuthDialog";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

const Layout = ({ children }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.auth.isLogged);
  const displayAuthDialog = useSelector(
    (state) => state.authDialog.displayAuthDialog
  );

  const handleDisplayAuthDialog = () =>
    dispatch({ type: "AUTH_DIALOG", payload: true });
  const handleCloseAuthDialog = () =>
    dispatch({ type: "AUTH_DIALOG", payload: false });

  return (
    <>
      <Header
        categoriesOpen={categoriesOpen}
        setCategoriesOpen={setCategoriesOpen}
        isLogged={isLogged}
        handleDisplayAuthDialog={handleDisplayAuthDialog}
      />
      <Main
        children={children}
        categoriesOpen={categoriesOpen}
        isLogged={isLogged}
        handleDisplayAuthDialog={handleDisplayAuthDialog}
        setCategoriesOpen={setCategoriesOpen}
      />
      {displayAuthDialog && (
        <AuthDialog handleCloseAuthDialog={handleCloseAuthDialog} />
      )}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
};

export default Layout;
