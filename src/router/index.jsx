import { RouterProvider } from "react-router-dom";
import {router} from "./routing.jsx";

export default function Router() {
    return (
        <RouterProvider
            router={router}
            future={{
                v7_startTransition: true,
            }}
        />
    );
}