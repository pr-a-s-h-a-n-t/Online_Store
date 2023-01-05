import { color } from "@mui/system";
import { Store } from "react-notifications-component";
import "./Notifications.css"
export const Notification = ({ message, type = null }) => {
  console.log(type);
  Store.addNotification({
    title: "Wonderful!",
    message: message,
    type:  type ?? "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    // className: type === "error" ? "notification-error" : "notification",
    // style: { backgroundColor: type === "error" ? "red" : "green" },
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
    
  });
  
};