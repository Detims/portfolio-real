import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { NavLink } from "react-router";
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
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
            <Suspense fallback={null}>
                <HeroGeometry />
            </Suspense>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.12)_42%,transparent_68%)]"
            />
            <motion.div
                className="relative z-10 text-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
                initial="hidden"
                animate="visible"
                variants={staggerFadeDrop}
            >
                <motion.h1
                    className="font-mono text-5xl font-light text-white md:text-6xl lg:text-8xl"
                    variants={fadeDrop}
                >
                    Nhan Nguyen
                </motion.h1>
                <motion.h2 className="mt-8 text-2xl" variants={fadeDrop}>
                    Software Engineer
                </motion.h2>
                <motion.div
                    className="mt-10"
                    variants={fadeDrop}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18, ease: softEase }}
                >
                    <NavLink 
                        to="/projects"
                        className="relative rounded-full border-2 border-white/60 bg-white/10 px-8 py-3 font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/15"
                    >
                        Projects
                    </NavLink>
                </motion.div>
            </motion.div>
        </section>
    )
}
