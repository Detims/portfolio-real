import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
];

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
            <button
                type="button"
                aria-controls="mobile-navigation"
                aria-expanded={open}
                aria-label={open ? "Close navigation" : "Open navigation"}
                className="fixed left-5 top-5 z-70 grid size-12 place-items-center bg-black/70 text-white backdrop-blur-md transition-colors hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:hidden"
                onClick={() => setOpen((isOpen) => !isOpen)}
            >
                <span className="sr-only">
                    {open ? "Close navigation" : "Open navigation"}
                </span>
                <span aria-hidden="true" className="relative block h-4 w-5">
                    <span
                        className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                            open ? "translate-y-1.75 rotate-45" : ""
                        }`}
                    />
                    <span
                        className={`absolute left-0 top-1.75 h-px w-5 bg-current transition-opacity duration-200 ${
                            open ? "opacity-0" : "opacity-100"
                        }`}
                    />
                    <span
                        className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 ${
                            open ? "-translate-y-2 -rotate-45" : ""
                        }`}
                    />
                </span>
            </button>

            {open && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    className="fixed inset-0 z-55 bg-black/60 backdrop-blur-[2px] md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                id="mobile-navigation"
                aria-hidden={!open}
                className={`fixed inset-y-0 left-0 z-60 flex w-[min(82vw,20rem)] flex-col justify-center border-r border-white/15 bg-black/95 px-8 shadow-2xl shadow-black transition-transform duration-300 ease-out md:hidden ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <p className="mb-10 text-xs uppercase tracking-[0.35em] text-white/40">
                    Navigation
                </p>
                <nav aria-label="Mobile navigation">
                    <ul className="space-y-7">
                        {navLinks.map(({ label, href }, index) => (
                            <li key={href}>
                                <NavLink
                                    to={href}
                                    end={href === "/"}
                                    tabIndex={open ? 0 : -1}
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
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <aside className="fixed left-0 top-0 z-50 hidden h-screen w-28 flex-col justify-center pb-8 pl-18 pr-7 md:flex">
                <nav aria-label="Primary navigation">
                    <ul className="space-y-6">
                        {navLinks.map(({ label, href }) => (
                            <li key={href}>
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
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
