import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout=()=>{
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);
  console.log(user);
  useEffect(()=>{
      user && dispatch(deleteUserAsync(user.id))
  })  
  return(
        !user && <Navigate to='/login'></Navigate>
    )
}
export default Logout;