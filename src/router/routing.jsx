import {createBrowserRouter} from "react-router-dom";
import {Login,Register} from "../feature/authentication";


export const router=createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
])