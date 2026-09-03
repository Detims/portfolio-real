import { MotionConfig } from "motion/react";
import { Outlet } from "react-router";
import { TopNavigation } from "./components/top-navigation";

export function RootLayout() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="root flex min-h-screen flex-col bg-black text-white">
                <TopNavigation />
                <main className="overflow-x-clip">
                    <Outlet />
                </main>
            </div>
        </MotionConfig>
    );
}
