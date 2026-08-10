import { Outlet } from "react-router";
import { Sidebar } from "./components/sidebar";

export function RootLayout() {
    return (
        <div
            lang="en"
            className="h-full antialiased"
        >
            <body className="min-h-full flex flex-col bg-black text-white">
                <Sidebar />
                <main>
                    <Outlet />
                </main>
            </body>
        </div>
    )
}