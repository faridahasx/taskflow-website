import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PageLoading from "components/Loading/PageLoading";

const LoginSuccessRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("firstLogin", "true");
    dispatch({ type: "IS_LOGGED", payload: true });
    // dispatch({ type: "ALERT", payload: "Login Success!" });
    navigate("/");
    // eslint-disable-next-line
  }, []);

  return <PageLoading />;
};

export default LoginSuccessRedirect;
