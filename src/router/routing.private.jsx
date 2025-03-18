import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";


export default function RoutingPrivate() {
    const {isAuthenticated}=useSelector(state=>state.authSlice)
    console.log(isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}