import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import {
    fadeDrop,
    softEase,
    staggerFadeDrop,
} from "../lib/motion";

const HeroGeometry = lazy(async () => {
    const module = await import("../components/hero-geometry");

    return { default: module.HeroGeometry };
});

export function Home() {
    return(
        <section id="home" className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-black">
            {/* Emergency gradient */}
            <div 
                className="pointer-events-none absolute inset-x-0 bottom-0 z-2
                h-[10%]
                bg-linear-to-b from-transparent via-black/60 to-black"
            />
            <Suspense fallback={null}>
                <HeroGeometry />
            </Suspense>
            <div
                className="hidden md:visible pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.12)_42%,transparent_68%)]"
            />
            <div
                className="hidden md:visible pointer-events-none absolute inset-y-0 left-0 z-2 w-[10%] bg-linear-to-r from-black to-transparent"
            />
            <div
                className="hidden md:visible pointer-events-none absolute inset-y-0 right-0 z-2 w-[10%] bg-linear-to-l from-black to-transparent"
            />
            <motion.div
                className="relative z-10 text-center"
                initial="hidden"
                animate="visible"
                variants={staggerFadeDrop}
            >
                <motion.h1
                    className="font-mono text-5xl font-light text-white md:text-6xl lg:text-8xl [text-shadow:0_3px_12px_rgba(0,0,0,0.95)]"
                    variants={fadeDrop}
                >
                    Nhan Nguyen
                </motion.h1>
                <motion.h2 className="mt-8 text-2xl [text-shadow:0_2px_8px_rgba(0,0,0,0.95)]" variants={fadeDrop}>
                    Software Engineer
                </motion.h2>
                <motion.div
                    className="mt-10"
                    variants={fadeDrop}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18, ease: softEase }}
                >
                    <a
                        href="#projects"
                        className="relative rounded-full border-2 border-white/60 bg-white/20 px-8 py-3 font-medium backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.7)] text-white transition-colors duration-200 hover:border-white hover:bg-white/40"
                    >
                        Projects
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}
