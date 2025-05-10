'use client'
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
    ]

    const handleLinkClick = () => {
        setIsOpen(false)
    }

    return (
        <nav className="fixed p-8 w-full top-0 z-10 transition-all bg-[#001921] shadow-md">
            <div className="container flex mx-auto justify-end w-full items-center">

                {/* Hamburger Menu */}
                <button className="md:hidden focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <IoMdClose fill="white" className="w-8 h-8" /> : <GiHamburgerMenu fill="white" className="w-8 h-8"/>}
                </button>

                {/* Navbar Links */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul 
                            initial= {{ opacity: 0, y: -50 }}
                            animate= {{ opacity: 1, y: 0 }}
                            exit= {{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden absolute top-full w-full bg-[#001921] right-0 flex flex-col pt-0 gap-4 items-center p-6"
                        >
                            {navItems.map((item) => (
                                <li key={item.href} className="px-4">
                                    <Link 
                                        href={item.href} 
                                        className={`relative text-lg hover:text-[#00A7E1] transition-colors duration-300`}
                                        onClick={handleLinkClick}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center">
                    {navItems.map((item) => (
                        <li key={item.href} className="px-4">
                            <Link 
                                href={item.href} 
                                className={`relative text-lg text-white hover:text-[#00A7E1] group`}
                                onClick={handleLinkClick}
                            >
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