// External imports
import { Suspense } from "react";
import PropTypes from "prop-types";
// Components
import IconButton from "../IconButtons/IconButton";
import LoadNavItemFallback from "./LoadNavItemFallback";
// Styles
import "./NavigationItem.css";

const NavigationItem = (props) => {
  // Destructure props
  const { handleClick, title, Icon, openComponent, Component } = props;

  return (
    <span className="nav-item center">
      <IconButton
        Icon={Icon}
        buttonProps={{ onClick: handleClick, title: title }}
      />
      <Suspense fallback={<LoadNavItemFallback />}>
        {openComponent && Component}
      </Suspense>
    </span>
  );
};

NavigationItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  openComponent: PropTypes.bool.isRequired,
  Icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  Component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
};

export default NavigationItem;
