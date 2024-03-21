import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

const AdminProtected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const userInfo=useSelector(selectUserInfo);
  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (!user && userInfo?.role !== "Admin")
    return <Navigate to="/" replace={true}></Navigate>;
  return children;
};

export default AdminProtected;
