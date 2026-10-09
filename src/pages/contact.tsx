import { Divider } from "../components/divider";
import { HiOutlineMail } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { motion } from "motion/react";
import {
    fadeDrop,
    softEase,
    staggerFadeDrop,
} from "../lib/motion";

const links = [
    {
        label: "Email",
        link: "mailto:nnguyen102304@gmail.com",
        icon: HiOutlineMail,
    },
    {
        label: "LinkedIn",
        link: "https://www.linkedin.com/in/nhan-nguyen-281a11294/",
        icon: FaLinkedin,
    },
    {
        label: "Resume", 
        link: "", 
        icon: IoDocumentOutline 
    },
];

export function Contact() {
    return (
        <Divider label="Contact" id="contact">
            <motion.div 
                className="flex flex-col"
                initial="hidden"
                animate="visible"
                variants={staggerFadeDrop}
            >
                <motion.h2 
                    className="text-lg text-white/70 md:mx-0"
                    variants={fadeDrop}
                >
                    I'm open to opportunities or just chatting. You can contact me through these methods:
                </motion.h2>
                <ul className="relative mt-6 w-full flex gap-20">
                    {links.map(({ label, link, icon: Icon }) => {
                        return (
                            <li key={label}>
                                <motion.a 
                                    className="my-2 py-2 flex items-center gap-2 text-lg text-white/70 hover:text-white duration-200" href={link}
                                    variants={fadeDrop}
                                    whileHover={{ y: -2 }}
                                    transition={{
                                        duration: 0.18,
                                        ease: softEase,
                                    }}
                                >
                                    <Icon
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                    {label}
                                </motion.a>
                            </li>
                        )
                    })}
                </ul>
            </motion.div>
        </Divider>
    )
}
