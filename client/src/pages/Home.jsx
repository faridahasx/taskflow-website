import { TaskProvider } from "../context/TaskContext";
import Layout from "../components/Layout/Layout";
import TasksContainer from "../containers/Tasks/TasksContainer";

const Home = () => {
  return (
    <TaskProvider>
      <Layout>
        <TasksContainer />
      </Layout>
    </TaskProvider>
  );
};

export default Home;
