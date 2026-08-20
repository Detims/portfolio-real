import { lazy, Suspense } from "react";
import { NavLink } from "react-router";

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
            <div className="relative z-10 text-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                <h1 className="font-mono font-light text-white text-5xl md:text-6xl lg:text-8xl">
                    Nhan Nguyen
                </h1>
                <h2 className="mt-8 text-2xl">
                    Software Engineer
                </h2>
                <div className="mt-10">
                    <NavLink 
                        to="/projects"
                        className="relative rounded-full border-2 border-white/60 bg-white/10 px-8 py-3 font-medium text-white"
                    >
                        Projects
                    </NavLink>
                </div>
            </div>
        </section>
    )
}
