// Components
import CircularLoading from "components/Loading/CircularLoading";

const LoadNavItemFallback = () => {
  return (
    <span className="center load-nav-item">
      <CircularLoading />
    </span>
  );
};

export default LoadNavItemFallback;
