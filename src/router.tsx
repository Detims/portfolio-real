import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Projects } from "./pages/projects";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "about",
                Component: About,
            },
            {
                path: "projects",
                Component: Projects,
            },
        ],
    },
]);