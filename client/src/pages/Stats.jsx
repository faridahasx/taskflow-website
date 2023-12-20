/**
 * Stats Component
 *
 * This component represents the statistics page,
 * rendering StatsContainer inside Layout
 * to display relevant statistical information about tasks.
 *
 */

// Imports
import StatsContainer from "../containers/StatsContainer";
import Layout from "../components/Layout/Layout";

const Stats = () => {
  return (
    <Layout>
      <StatsContainer />
    </Layout>
  );
};

export default Stats;
