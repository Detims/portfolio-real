'use client'
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

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
                    <ul className="md:hidden absolute top-full w-full bg-stone-400 right-0 flex flex-col pt-0 gap-4 items-center p-6">
                        {navItems.map((item) => (
                            <li key={item.href} className="px-4">
                                <Link href={item.href} className="relative text-lg">
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
                            <Link href={item.href} className="relative text-lg">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar