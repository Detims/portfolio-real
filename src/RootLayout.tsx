import { MotionConfig } from "motion/react";
import { TopNavigation } from "./components/top-navigation";
import { Portfolio } from "./pages/portfolio";

export function RootLayout() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="root flex min-h-screen flex-col bg-black text-white">
                <TopNavigation />
                <main className="overflow-x-clip">
                    <Portfolio />
                </main>
            </div>
        </MotionConfig>
    );
}
