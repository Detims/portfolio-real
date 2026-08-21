import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useLocation, useOutlet } from "react-router";
import { Sidebar } from "./components/sidebar";
import { softEase } from "./lib/motion";

export function RootLayout() {
    const location = useLocation();
    const outlet = useOutlet();

    return (
        <MotionConfig reducedMotion="user">
            <div className="root flex min-h-screen flex-col bg-black text-white">
                <Sidebar />
                <AnimatePresence initial={false} mode="wait">
                    <motion.main
                        key={location.pathname}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.28, ease: softEase }}
                    >
                        {outlet}
                    </motion.main>
                </AnimatePresence>
            </div>
        </MotionConfig>
    );
}
