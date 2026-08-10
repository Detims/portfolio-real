// import { useState } from "react";
import { NavLink } from "react-router";

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
];

export function Sidebar() {
    const pathname = window.location.pathname;
    // const [open, setOpen] = useState(false);

    return(
        <>
            {/* Desktop sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-28 flex-col justify-center pl-18 pr-7 pb-8 md:flex">
                <div className="flex flex-col">
                    <nav>
                        <ul className="space-y-6">
                            {navLinks.map(({label, href}) => {
                                const active = pathname === href;
                                return(
                                    <li key={href}>
                                        <NavLink 
                                            to={href}
                                            className={`relative text-xl
                                                ${active ? 'active' : ''}`
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}