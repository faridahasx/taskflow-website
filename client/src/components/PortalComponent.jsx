import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const PortalComponent = ({ children }) => {
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;
  return createPortal(children, portalRoot);
};

PortalComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object]),
};

export default PortalComponent;
