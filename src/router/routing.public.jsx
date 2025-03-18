import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";


export default function RoutingPublic() {
    const {isAuthenticated}=useSelector(state=>state.authSlice)
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
}