import { useEffect } from "react";
import { useLocation } from "react-router";
import { About } from "./about";
import { Home } from "./home";
import { Projects } from "./projects";

export function Portfolio() {
    const location = useLocation();

    useEffect(() => {
        const sectionId = decodeURIComponent(location.hash.slice(1));

        if (!sectionId) {
            return;
        }

        const animationFrame = window.requestAnimationFrame(() => {
            document.getElementById(sectionId)?.scrollIntoView({
                block: "start",
            });
        });

        return () => window.cancelAnimationFrame(animationFrame);
    }, [location.hash]);

    return (
        <>
            <Home />
            <About />
            <Projects />
        </>
    );
}
