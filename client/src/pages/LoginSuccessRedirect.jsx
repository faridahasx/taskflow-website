import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoadingPage from "../components/Loading/LoadingPage";

const LoginSuccessRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("firstLogin", "true");
    dispatch({ type: "IS_LOGGED", payload: true });
    dispatch({ type: "ALERT", payload: "Login Success!" });
    dispatch({ type: "AUTH_DIALOG", payload: false });
    navigate("/");
    // eslint-disable-next-line
  }, []);

  return <LoadingPage />;
};

export default LoginSuccessRedirect;
