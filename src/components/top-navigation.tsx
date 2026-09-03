import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router";
import { softEase } from "../lib/motion";

const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
];

const mobileListVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.08,
            staggerChildren: 0.055,
        },
    },
};

const mobileItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: softEase },
    },
};

export function TopNavigation() {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(() =>
        window.location.hash.slice(1) || "home",
    );

    useEffect(() => {
        const sectionId = location.hash.slice(1);

        if (!navLinks.some(({ id }) => id === sectionId)) {
            return;
        }

        const animationFrame = window.requestAnimationFrame(() => {
            setActiveSection(sectionId);
        });

        return () => window.cancelAnimationFrame(animationFrame);
    }, [location.hash]);

    useEffect(() => {
        let animationFrame = 0;

        const updateActiveSection = () => {
            const activationPoint =
                window.scrollY + Math.min(window.innerHeight * 0.3, 240);
            const sections = navLinks
                .map(({ id }) => document.getElementById(id))
                .filter((section): section is HTMLElement => Boolean(section));
            const currentSection = sections.reduce(
                (active, section) =>
                    section.offsetTop <= activationPoint ? section : active,
                sections[0],
            );

            if (currentSection) {
                setActiveSection(currentSection.id);
            }

            animationFrame = 0;
        };

        const scheduleUpdate = () => {
            if (!animationFrame) {
                animationFrame = window.requestAnimationFrame(
                    updateActiveSection,
                );
            }
        };

        updateActiveSection();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);

        return () => {
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            window.cancelAnimationFrame(animationFrame);
        };
    }, []);

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const handleNavigation = (sectionId: string) => {
        setActiveSection(sectionId);
        setOpen(false);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
            <div className="relative z-70 mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
                <motion.a
                    href="#home"
                    className="font-mono text-sm tracking-[0.16em] text-white"
                    onClick={() => handleNavigation("home")}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18, ease: softEase }}
                >
                    Nhan Nguyen
                </motion.a>

                <nav aria-label="Primary navigation" className="hidden md:block">
                    <ul className="flex items-center gap-8 lg:gap-10">
                        {navLinks.map(({ label, id }) => {
                            const isActive = activeSection === id;

                            return (
                                <motion.li
                                    key={id}
                                    className="relative"
                                    whileHover={{ y: -2 }}
                                    transition={{
                                        duration: 0.18,
                                        ease: softEase,
                                    }}
                                >
                                    <a
                                        href={`#${id}`}
                                        aria-current={
                                            isActive ? "location" : undefined
                                        }
                                        onClick={() => handleNavigation(id)}
                                        className={`text-sm transition-colors ${
                                            isActive
                                                ? "text-white"
                                                : "text-white/50 hover:text-white"
                                        }`}
                                    >
                                        {label}
                                    </a>
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-navigation-link"
                                            aria-hidden="true"
                                            className="absolute -bottom-2 left-0 h-px w-full bg-indigo-300"
                                            transition={{
                                                duration: 0.22,
                                                ease: softEase,
                                            }}
                                        />
                                    )}
                                </motion.li>
                            );
                        })}
                    </ul>
                </nav>

                <motion.button
                    type="button"
                    aria-controls="mobile-navigation"
                    aria-expanded={open}
                    aria-label={open ? "Close navigation" : "Open navigation"}
                    className="grid size-11 place-items-center text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:hidden"
                    onClick={() => setOpen((isOpen) => !isOpen)}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.18, ease: softEase }}
                >
                    <span className="sr-only">
                        {open ? "Close navigation" : "Open navigation"}
                    </span>
                    <span aria-hidden="true" className="relative block h-4 w-5">
                        <motion.span
                            className="absolute left-0 top-0 h-px w-5 bg-current"
                            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
                            transition={{ duration: 0.24, ease: softEase }}
                        />
                        <motion.span
                            className="absolute left-0 top-1.75 h-px w-5 bg-current"
                            animate={{ opacity: open ? 0 : 1 }}
                            transition={{ duration: 0.16, ease: softEase }}
                        />
                        <motion.span
                            className="absolute bottom-0 left-0 h-px w-5 bg-current"
                            animate={{
                                rotate: open ? -45 : 0,
                                y: open ? -8 : 0,
                            }}
                            transition={{ duration: 0.24, ease: softEase }}
                        />
                    </span>
                </motion.button>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.button
                        type="button"
                        aria-label="Close navigation"
                        className="fixed inset-0 top-16 z-55 bg-black/60 backdrop-blur-[2px] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: softEase }}
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.aside
                        id="mobile-navigation"
                        className="fixed inset-y-0 right-0 z-60 flex w-[min(82vw,20rem)] flex-col justify-center border-l border-white/15 bg-black/95 px-8 pt-16 shadow-2xl shadow-black md:hidden"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: softEase }}
                    >
                        <p className="mb-10 text-xs uppercase tracking-[0.35em] text-white/40">
                            Navigation
                        </p>
                        <nav aria-label="Mobile navigation">
                            <motion.ul
                                className="space-y-7"
                                initial="hidden"
                                animate="visible"
                                variants={mobileListVariants}
                            >
                                {navLinks.map(({ label, id }, index) => {
                                    const isActive = activeSection === id;

                                    return (
                                        <motion.li
                                            key={id}
                                            variants={mobileItemVariants}
                                        >
                                            <a
                                                href={`#${id}`}
                                                aria-current={
                                                    isActive
                                                        ? "location"
                                                        : undefined
                                                }
                                                onClick={() =>
                                                    handleNavigation(id)
                                                }
                                                className={`group flex items-center gap-4 text-3xl transition-colors ${
                                                    isActive
                                                        ? "text-white"
                                                        : "text-white/45 hover:text-white"
                                                }`}
                                            >
                                                <span className="font-mono text-xs text-white/35">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>
                                                <span>{label}</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`h-px flex-1 transition-colors ${
                                                        isActive
                                                            ? "bg-white/70"
                                                            : "bg-white/10 group-hover:bg-white/30"
                                                    }`}
                                                />
                                            </a>
                                        </motion.li>
                                    );
                                })}
                            </motion.ul>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </header>
    );
}
