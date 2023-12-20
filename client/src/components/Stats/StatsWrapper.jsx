// External imports
import { useMemo } from "react";
import PropTypes from "prop-types";
// Hooks
import useNetworkStatus from "../../hooks/useNetworkStatus";
// Components
import OfflineContent from "../../components/OfflineContent";
import CircularLoading from "../../components/Loading/CircularLoading";
import FiltersNav from "../../components/NavigationItem/FiltersNav";
import StatListItem from "./StatListItem";
import StatsHeading from "./StatsHeading";
// Styles
import "./StatsWrapper.css";

const StatsWrapper = ({ stats, loading, isLogged, start, end }) => {
  const statKeys = useMemo(() => stats && Object.keys(stats), [stats]);
  const isOnline = useNetworkStatus();

  return (
    <div id="stats" className="column">
      {!isOnline && stats === null ? (
        <OfflineContent />
      ) : (
        <div id="stats-wrapper" className="column">
          <>
            <div id="stats-top" className="flex">
              <FiltersNav />
              <StatsHeading start={start} end={end} />
            </div>

            {isLogged === false ? (
              <span className="center stats-empty">
                Sign in to unlock this feature
              </span>
            ) : loading || stats === null ? (
              <span className="center stats-empty">
                <CircularLoading />
              </span>
            ) : (
              stats !== null &&
              (statKeys.length ? (
                <ul id="stats-listing" className="">
                  {statKeys.map((s) => (
                    <StatListItem key={s} statKey={s} statValue={stats[s]} />
                  ))}
                </ul>
              ) : (
                <span className="center stats-empty">No available data</span>
              ))
            )}
          </>
        </div>
      )}
    </div>
  );
};

StatsWrapper.propTypes = {
  stats: PropTypes.any,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default StatsWrapper;
