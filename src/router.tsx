import { Navigate, createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { Portfolio } from "./pages/portfolio";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Portfolio,
            },
            {
                path: "about",
                element: <Navigate to="/#about" replace />,
            },
            {
                path: "projects",
                element: <Navigate to="/#projects" replace />,
            },
        ],
    },
]);
