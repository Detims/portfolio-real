'use client'
import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="fixed p-4 w-full top-0 z-10">
            <div className="flex mx-auto">
                <ul className="hidden md:flex items-center">
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/about', label: 'About' },
                        { href: '/experience', label: 'Experience' },
                        { href: '/projects', label: 'Projects' },
                    ].map((item) => (
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