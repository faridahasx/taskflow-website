import { TaskProvider } from "../context/TaskContext";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import TasksContainer from "../containers/Tasks/TasksContainer";
import TasksUnauthorizedView from "../components/Tasks/TasksUnauthorizedView";

const Home = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  return (
    <TaskProvider>
      <Layout>
        {isLogged === false ? (
          <TasksUnauthorizedView />
        ) : (
          isLogged === true && <TasksContainer />
        )}
      </Layout>
    </TaskProvider>
  );
};

export default Home;
