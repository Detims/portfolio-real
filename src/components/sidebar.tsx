import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router";
import { softEase } from "../lib/motion";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
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

export function Sidebar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    return (
        <>
            <motion.button
                type="button"
                aria-controls="mobile-navigation"
                aria-expanded={open}
                aria-label={open ? "Close navigation" : "Open navigation"}
                className="fixed left-5 top-5 z-70 grid size-12 place-items-center bg-black/70 text-white backdrop-blur-md transition-colors hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:hidden"
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
                        animate={{
                            rotate: open ? 45 : 0,
                            y: open ? 7 : 0,
                        }}
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

            <AnimatePresence initial={false}>
                {open && (
                    <motion.button
                        type="button"
                        aria-label="Close navigation"
                        className="fixed inset-0 z-55 bg-black/60 backdrop-blur-[2px] md:hidden"
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
                        className="fixed inset-y-0 left-0 z-60 flex w-[min(82vw,20rem)] flex-col justify-center border-r border-white/15 bg-black/95 px-8 shadow-2xl shadow-black md:hidden"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
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
                                {navLinks.map(({ label, href }, index) => (
                                    <motion.li
                                        key={href}
                                        variants={mobileItemVariants}
                                    >
                                        <NavLink
                                            to={href}
                                            end={href === "/"}
                                            onClick={() => setOpen(false)}
                                            className={({ isActive }) =>
                                                `group flex items-center gap-4 text-3xl transition-colors ${
                                                    isActive
                                                        ? "text-white"
                                                        : "text-white/45 hover:text-white"
                                                }`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <span className="font-mono text-xs text-white/35">
                                                        {String(index + 1).padStart(2, "0")}
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
                                                </>
                                            )}
                                        </NavLink>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>

            <aside className="fixed left-0 top-0 z-50 hidden h-screen w-28 flex-col justify-center pb-8 pl-18 pr-7 md:flex">
                <nav aria-label="Primary navigation">
                    <ul className="space-y-6">
                        {navLinks.map(({ label, href }) => (
                            <motion.li
                                key={href}
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.18, ease: softEase }}
                            >
                                <NavLink
                                    to={href}
                                    end={href === "/"}
                                    className={({ isActive }) =>
                                        `relative text-xl transition-colors ${
                                            isActive
                                                ? "text-white"
                                                : "text-white/45 hover:text-white"
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </motion.li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
