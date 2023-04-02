import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
function ProtectedRoute({ children }) {
  const loginUser = useSelector((store) => store.loginUser);

  const {user}  = loginUser;
 

  if (!user) {
    console.log("if not user");
    return <Navigate to="/login" />;
  }
  console.log("ka user");
  return children;
}

export default ProtectedRoute;
