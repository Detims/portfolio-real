'use client'
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const isActive = (path) => pathname === path;

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
    ]

    return (
        <nav className="fixed p-8 w-full top-0 z-10 transition-all bg-[#001921] shadow-md">
            <div className="container flex mx-auto justify-end w-full items-center">

                {/* Hamburger Menu */}
                <button className="md:hidden focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "X" : "O"}
                </button>

                {/* Navbar Links */}
                {isOpen && (
                    <ul className="md:hidden absolute top-full w-full bg-[#001921] right-0 flex flex-col pt-0 gap-4 items-center p-6">
                        {navItems.map((item) => (
                            <li key={item.href} className="px-4">
                                <Link href={item.href} className={`relative text-lg hover:text-[#00A7E1] transition-colors duration-300`}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center">
                    {navItems.map((item) => (
                        <li key={item.href} className="px-4">
                            <Link href={item.href} className={`relative text-lg text-white hover:text-[#00A7E1] group`}>
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00A7E1] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-100"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar