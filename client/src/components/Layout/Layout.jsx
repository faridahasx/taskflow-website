// External imports
import { useState } from "react";
import PropTypes from "prop-types";
// Components
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

const Layout = ({ children }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      <Header
        categoriesOpen={categoriesOpen}
        setCategoriesOpen={setCategoriesOpen}
      />
      <Main
        categoriesOpen={categoriesOpen}
        setCategoriesOpen={setCategoriesOpen}
      >
        {children}
      </Main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object]),
};

export default Layout;
