// External imports
import { Suspense } from "react";
import PropTypes from "prop-types";
// Components
import IconButton from "components/IconButtons/IconButton";
import LoadNavItemFallback from "./LoadNavItemFallback";
// Styles
import "./NavigationItem.css";

const NavigationItem = (props) => {
  // Destructure props
  const { title, openComponent, Component, Icon, handleClick } = props;

  return (
    <span className="nav-item center">
      <IconButton Icon={Icon} onClick={handleClick} title={title} />
      <Suspense fallback={<LoadNavItemFallback />}>
        {openComponent && Component}
      </Suspense>
    </span>
  );
};

NavigationItem.propTypes = {
  title: PropTypes.string.isRequired,
  openComponent: PropTypes.bool.isRequired,
  Component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  Icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NavigationItem;
