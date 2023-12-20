// External imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import PortalComponent from "../PortalComponent";
// Styles
import "./Message.css";

const Message = () => {
  const alert = useSelector((state) => state.alert.message);
  const dispatch = useDispatch();

  useEffect(() => {
    let clearAlert = setTimeout(() => {
      if (alert) dispatch({ type: "CLEAR_ALERT" });
    }, 3000);
    return () => clearTimeout(clearAlert);
  }, [alert, dispatch]);

  return (
    <PortalComponent>
      <div
        className={`center message ${alert ? "alert-message" : ""}`}
        title={alert}
      >
        <span className="center">{alert}</span>
      </div>
    </PortalComponent>
  );
};

export default Message;
