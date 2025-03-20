import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "../feature/authentication";
import RoutingPublic from "./routing.public.jsx";
import RoutingPrivate from "./routing.private.jsx";
import Dashboard from "../feature/dashboard";
import AddPress from "../feature/authentication/pressRelease/addPress.jsx";

export const router = createBrowserRouter([
  {
    element: <RoutingPublic />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <RoutingPrivate />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/addPress",
        element: <AddPress />,
      },
    ],
  },
]);
